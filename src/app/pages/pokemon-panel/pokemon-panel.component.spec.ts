import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ComponentsModule } from 'src/app/components/components.module';
import { PokemonPanelComponent, ProcessType } from './pokemon-panel.component';

describe('PokemonPanelComponent', () => {
  let component: PokemonPanelComponent;
  let fixture: ComponentFixture<PokemonPanelComponent>;

  const mockPokemon = {
    id: 35,
    name: "Alakazam",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
    attack: 79,
    defense: 61,
    hp: 55,
    type: "Eléctrico",
    idAuthor: 13
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ComponentsModule
      ],
      declarations: [
        PokemonPanelComponent
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // createForm

  it('createForm: ', () => {

  });

  // searchPokemon

  it('searchPokemon: should validate that the variables change state and that the query service is not being called', () => {
    const mockParam = '-1';
    const spy1 = jest.spyOn(component.pokemonForm, 'reset');
    const spy2 = jest.spyOn(component.pokemonService, 'getPokemonByIdAuthor').mockImplementation();
    component.showUpdatePanel = true;
    component.tableData = [mockPokemon];
    
    component.searchPokemon(mockParam);

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).not.toBeCalled();
    expect(component.showUpdatePanel).toBeFalsy();
    expect(component.tableData).toEqual([]);
  });

  it('searchPokemon: should validate that the query service is called and that the table values are initialized', () => {
    const mockParam = '1';
    const spy = jest.spyOn(component.pokemonService, 'getPokemonByIdAuthor').mockReturnValue(of([mockPokemon]));
    component.spinner = true;
    
    component.searchPokemon(mockParam);

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual(Number(mockParam));
    expect(component.tableData).toEqual([mockPokemon]);
    expect(component.spinner).toBeFalsy();
  });

  it('searchPokemon: should validate that the query service is called and does not return an error message', () => {
    const mockError = 'errorTest';
    const spy1 = jest.spyOn(component.pokemonService, 'getPokemonByIdAuthor').mockReturnValue(of({ error: true, messageError: mockError }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    
    component.searchPokemon('1');
    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual(mockError);
    expect(component.tableData).toEqual([]);
  });

  it('searchPokemon: should validate that the query service is called and returns an error message', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'getPokemonByIdAuthor').mockReturnValue(of({ error: true }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    
    component.searchPokemon('1');

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual('alertMessages.errorGet');
  });

  // newPokemon

  it('newPokemon: should validate that the variables change state', () => {
    component.selectedPokemon = mockPokemon;
    component.updateTitle = '';
    component.showUpdatePanel = false;
    const spy1 = jest.spyOn(component.pokemonForm, 'reset');
    
    component.newPokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(component.selectedPokemon).toBeNull();
    expect(component.updateTitle).toEqual('pokemonPanel.create');
    expect(component.showUpdatePanel).toBeTruthy();
  });

  // selectOptionInput

  it('selectOptionInput: should store the information received in the referenced form variable', () => {
    const mockData = 'test';
    const mockField = 'name';
    component.pokemonForm.controls[mockField].reset();
    component.selectOptionInput(mockData, mockField);
    expect(component.pokemonForm.controls[mockField].value).toEqual(mockData);
  });

  // selectAction

  it('selectAction: should validate that the process is associated with editing pokemon', () => {
    jest.useFakeTimers();
    const spy = jest.spyOn(component, 'newPokemon').mockImplementation();
    component.pokemonForm.reset();
    component.selectedPokemon = null;
    component.updateTitle = '';
    
    component.selectAction({ object: mockPokemon, action: 0 });
    
    jest.runAllTimers();
    expect(spy).toBeCalledTimes(1);
    expect(component.selectedPokemon).toEqual(mockPokemon);
    expect(component.updateTitle).toEqual('pokemonPanel.update');
    expect(component.pokemonForm.controls['name'].value).toEqual(mockPokemon.name);
    expect(component.pokemonForm.controls['image'].value).toEqual(mockPokemon.image);
    expect(component.pokemonForm.controls['attack'].value).toEqual(mockPokemon.attack);
    expect(component.pokemonForm.controls['defense'].value).toEqual(mockPokemon.defense);
    expect(component.pokemonForm.controls['hp'].value).toEqual(mockPokemon.hp);
    expect(component.pokemonForm.controls['type'].value).toEqual(mockPokemon.type);
    expect(component.pokemonForm.controls['idAuthor'].value).toEqual(mockPokemon.idAuthor);
  });

  it('selectAction: should validate that the process is associated with deleting pokemon', () => {
    component.selectedPokemon = null;
    component.process = null;
    const spy = jest.spyOn(component, 'showAlert').mockImplementation();

    component.selectAction({ object: mockPokemon, action: 1 });

    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual('alertMessages.confirmDelete');
    expect(component.process).toEqual(ProcessType.delete);
  });

  // savePokemon

  it('savePokemon: should validate that the form is invalid and terminate the process', () => {
    const spy1 = jest.spyOn(component, 'createPokemon').mockImplementation();
    const spy2 = jest.spyOn(component, 'updatePokemon').mockImplementation();
    component.pokemonForm.reset();

    component.savePokemon();

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();
  });

  it('savePokemon: should validate that the process is associated with creating a new pokemon and call the method create', () => {
    const spy1 = jest.spyOn(component, 'createPokemon').mockImplementation();
    const spy2 = jest.spyOn(component, 'updatePokemon').mockImplementation();
    component.pokemonForm.controls['name'].setValue(mockPokemon.name);
    component.pokemonForm.controls['image'].setValue(mockPokemon.image);
    component.pokemonForm.controls['attack'].setValue(mockPokemon.attack);
    component.pokemonForm.controls['defense'].setValue(mockPokemon.defense);
    component.updateTitle = 'create';

    component.savePokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).not.toBeCalled();
  });

  it('savePokemon: should validate that the process is associated with creating a new pokemon and call the method update', () => {
    const spy1 = jest.spyOn(component, 'createPokemon').mockImplementation();
    const spy2 = jest.spyOn(component, 'updatePokemon').mockImplementation();
    component.pokemonForm.controls['name'].setValue(mockPokemon.name);
    component.pokemonForm.controls['image'].setValue(mockPokemon.image);
    component.pokemonForm.controls['attack'].setValue(mockPokemon.attack);
    component.pokemonForm.controls['defense'].setValue(mockPokemon.defense);
    component.updateTitle = 'update';

    component.savePokemon();

    expect(spy1).not.toBeCalled();
    expect(spy2).toBeCalledTimes(1);
  });

  // createPokemon

  it('createPokemon: should validate that the create service is called and that the sent pokemon has been created', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'createPokemon').mockReturnValue(of(mockPokemon));
    const spy2 = jest.spyOn(component.pokemonForm, 'reset').mockImplementation();
    const spy3 = jest.spyOn(component, 'showAlert').mockImplementation();
    component.tableData = [];
    component.spinner = true;
    component.showUpdatePanel = true;

    component.createPokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1.mock.calls[0][0].idAuthor).toEqual(1);
    expect(spy3.mock.calls[0][0]).toEqual('alertMessages.successCreate');
    expect(component.spinner).toBeFalsy();
    expect(component.showUpdatePanel).toBeFalsy();
    expect(component.tableData).toEqual([mockPokemon]);
  });

  it('createPokemon: should validate that the create service is called and returns an error message', () => {
    const mockError = 'errorTest';
    const spy1 = jest.spyOn(component.pokemonService, 'createPokemon').mockReturnValue(of({ error: true, messageError: mockError }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    component.tableData = [mockPokemon];

    component.createPokemon();

    expect(spy1.mock.calls[0][0].idAuthor).toEqual(mockPokemon.idAuthor);
    expect(spy2.mock.calls[0][0]).toEqual(mockError);
  });

  it('searchPokemon: should validate that the create service is called and does not return an error message', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'createPokemon').mockReturnValue(of({ error: true }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    
    component.createPokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual('alertMessages.errorCreate');
  });

  // updatePokemon

  it('updatePokemon: should validate that the update service is called and that the sent pokemon has not been updated', () => {
    component.pokemonForm.controls['name'].setValue('name');
    component.pokemonForm.controls['image'].setValue('image');
    component.pokemonForm.controls['attack'].setValue(1);
    component.pokemonForm.controls['defense'].setValue(2);
    component.pokemonForm.controls['hp'].setValue(3);
    component.pokemonForm.controls['type'].setValue('type');
    component.pokemonForm.controls['idAuthor'].setValue(21);
    const mockResponse = component.pokemonForm.value;
    mockResponse.id = 0;
    const spy1 = jest.spyOn(component.pokemonService, 'updatePokemon').mockReturnValue(of(mockResponse));
    const spy2 = jest.spyOn(component.pokemonForm, 'reset').mockImplementation();
    const spy3 = jest.spyOn(component, 'showAlert').mockImplementation();
    component.selectedPokemon = null;
    component.tableData = [mockPokemon];
    component.spinner = true;
    component.showUpdatePanel = true;

    component.updatePokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1.mock.calls[0][0]).toEqual(mockResponse);
    expect(spy3.mock.calls[0][0]).toEqual('alertMessages.successUpdate');
    expect(component.spinner).toBeFalsy();
    expect(component.showUpdatePanel).toBeFalsy();
    expect(component.tableData).toEqual([mockPokemon]);
  });

  it('updatePokemon: should validate that the update service is called and that the sent pokemon has been updated', () => {
    component.pokemonForm.controls['name'].setValue('name');
    component.pokemonForm.controls['image'].setValue('image');
    component.pokemonForm.controls['attack'].setValue(1);
    component.pokemonForm.controls['defense'].setValue(2);
    component.pokemonForm.controls['hp'].setValue(3);
    component.pokemonForm.controls['type'].setValue('type');
    component.pokemonForm.controls['idAuthor'].setValue(21);
    const mockResponse = component.pokemonForm.value;
    mockResponse.id = mockPokemon.id;
    const spy1 = jest.spyOn(component.pokemonService, 'updatePokemon').mockReturnValue(of(mockResponse));
    const spy2 = jest.spyOn(component.pokemonForm, 'reset').mockImplementation();
    const spy3 = jest.spyOn(component, 'showAlert').mockImplementation();
    component.selectedPokemon = mockPokemon;
    component.tableData = [mockPokemon];

    component.updatePokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1.mock.calls[0][0]).toEqual(mockResponse);
    expect(spy3.mock.calls[0][0]).toEqual('alertMessages.successUpdate');
    expect(component.tableData).toEqual([mockResponse]);
  });

  it('updatePokemon: should validate that the update service is called and returns an error message', () => {
    const mockError = 'errorTest';
    const spy1 = jest.spyOn(component.pokemonService, 'updatePokemon').mockReturnValue(of({ error: true, messageError: mockError }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();

    component.updatePokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual(mockError);
  });

  it('searchPokemon: should validate that the update service is called and does not return an error message', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'updatePokemon').mockReturnValue(of({ error: true }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    
    component.updatePokemon();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual('alertMessages.errorUpdate');
  });

  // cancelProcess

  it('cancelProcess: should change the state of the variables', () => {
    const spy = jest.spyOn(component.pokemonForm, 'reset').mockImplementation();
    component.showUpdatePanel = true;
    component.cancelProcess();
    expect(spy).toBeCalledTimes(1);
    expect(component.showUpdatePanel).toBeFalsy();
  });

  // deletePokemon

  it('deletePokemon: should validate that the delete service is called and that the pokemon has been deleted', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'deletePokemon').mockReturnValue(of("Pokemon deleted"));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    component.tableData = [mockPokemon];
    component.spinner = true;

    component.deletePokemon(mockPokemon.id);

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    expect(spy1.mock.calls[0][0]).toEqual(mockPokemon.id);
    expect(spy2.mock.calls[0][0]).toEqual('alertMessages.successDelete');
    expect(component.spinner).toBeFalsy();
    expect(component.tableData).toEqual([]);
  });

  it('updatePokemon: should validate that the delete service is called and returns an error message', () => {
    const mockError = 'errorTest';
    const spy1 = jest.spyOn(component.pokemonService, 'deletePokemon').mockReturnValue(of({ error: true, messageError: mockError }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();

    component.deletePokemon(mockPokemon.id);

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual(mockError);
  });

  it('searchPokemon: should validate that the delete service is called and does not return an error message', () => {
    const spy1 = jest.spyOn(component.pokemonService, 'deletePokemon').mockReturnValue(of({ error: true }));
    const spy2 = jest.spyOn(component, 'showAlert').mockImplementation();
    
    component.deletePokemon(mockPokemon.id);

    expect(spy1).toBeCalledTimes(1);
    expect(spy2.mock.calls[0][0]).toEqual('alertMessages.errorDelete');
  });

  // showAlert

  it('showAlert: should change the state of the variables', () => {
    component.alertDescription = '';
    component.alertBtnCancel = false;
    component.alertShow = false;
    component.showAlert('test', true);
    expect(component.alertDescription).toEqual('test');
    expect(component.alertBtnCancel).toBeTruthy();
    expect(component.alertShow).toBeTruthy();
  });

  it('showAlert: should use the default value of the second parameter', () => {
    component.alertBtnCancel = true;
    component.showAlert('test');
    expect(component.alertBtnCancel).toBeFalsy();
  });

  // acceptAlert

  it('acceptAlert: should validate the process type and not execute anything', () => {
    const spy = jest.spyOn(component, 'deletePokemon').mockImplementation();
    component.alertShow = true;
    component.process = null;
    component.acceptAlert();
    expect(spy).not.toBeCalled();
    expect(component.alertShow).toBeFalsy();
  });

  it('acceptAlert: should validate the process type and call the delete pokemon method', () => {
    const spy = jest.spyOn(component, 'deletePokemon').mockImplementation();
    component.process = ProcessType.delete;
    component.selectedPokemon = mockPokemon;
    component.acceptAlert();
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual(mockPokemon.id);
  });

  it('acceptAlert: should validate the process type and call the delete pokemon method with id 0', () => {
    const spy = jest.spyOn(component, 'deletePokemon').mockImplementation();
    component.process = ProcessType.delete;
    component.selectedPokemon = null;
    component.acceptAlert();
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual(0);
  });

  // acceptCancel

  it('acceptCancel: should change the state of the alertShow variable', () => {
    component.alertShow = true;
    component.acceptCancel();
    expect(component.alertShow).toBeFalsy();
  });

});
