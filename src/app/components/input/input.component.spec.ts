import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        InputComponent
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // setRequired

  it('setRequired: should establish the control as mandatory', () => {
    component._required = false;
    component.required = true;
    const errors: any = component.inputTextCtrl.errors;
    expect(component._required).toBeTruthy();
    expect(errors.required).toBeTruthy();
  });

  it('setRequired: should establish the control as non-mandatory', () => {
    component._required = true;
    component.required = false;
    const errors: any = component.inputTextCtrl.errors;
    expect(component._required).toBeFalsy();
    expect(errors).toBeNull();
  });

  // setValue

  it('setValue: should set a new value for the control', () => {
    component.inputTextCtrl.reset();
    component.setValue = 'test';
    expect(component.inputTextCtrl.value).toEqual('test');
  });

  // inputTextCtrl

  it('inputTextCtrl: should validate whether the control complies with the required validation and issue the value received', () => {
    component.showErrorRequired = true;
    const spy = jest.spyOn(component.selected, 'emit').mockImplementation();
    component.inputTextCtrl.setValue('test');
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual('test');
    expect(component.showErrorRequired).toBeFalsy();
  });

  it('inputTextCtrl: should validate whether the control has already been touched and output the value received', () => {
    component.showErrorRequired = true;
    component.inputTextCtrl.setValidators(Validators.required);
    component.inputTextCtrl.markAsTouched();
    component.inputTextCtrl.reset()
    expect(component.showErrorRequired).toBeFalsy();
  });

  // onBlur

  it('onBlur: should validate whether the input has lost focus and output the received value', () => {
    component.inputTextCtrl.setValue('test');
    const spy = jest.spyOn(component.blur, 'emit').mockImplementation();
    component.onBlur();
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual('test');
  });
});
