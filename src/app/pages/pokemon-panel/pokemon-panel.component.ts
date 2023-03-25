import { Component } from '@angular/core';
import { FieldType } from 'src/app/components/table/table.component';
import { PokemonService } from 'src/app/pages/services/pokemon/pokemon.service';
import { PokemonModel } from 'src/app/core/models/pokemon.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-panel',
  templateUrl: './pokemon-panel.component.html',
  styleUrls: ['./pokemon-panel.component.scss']
})
export class PokemonPanelComponent {

  public tableHeaders = {
    baseTranslate: 'pokemonPanel.table.',
    headerList: ['name', 'image', 'attack', 'defense', 'actions']
  };
  public tableTypes = [
    {
      type: FieldType.text
    },
    {
      type: FieldType.image,
      url: '../../../assets/icons/image-solid.svg'
    },
    {
      type: FieldType.text
    },
    {
      type: FieldType.text
    },
    {
      type: FieldType.action,
      actions: [
        '../../../assets/icons/pen-to-square-solid.svg',
        '../../../assets/icons/trash-solid.svg'
      ]
    }
  ];
  public tableData: PokemonModel[] = [];
  public showUpdatePanel = false;
  public pokemonForm!: FormGroup;
  public selectedPokemon!: PokemonModel | null;
  public updateTitle = 'pokemonPanel.create';

  constructor(private formBuilder: FormBuilder,
              private pokemonService: PokemonService) {

    this.createForm();
  }

  createForm(): void {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      attack: [0, Validators.required],
      defense: [0, Validators.required],
      hp: 55,
      type: "Eléctrico",
      idAuthor: 1
    });
  }

  searchPokemon(id: string): void {
    this.pokemonForm.reset;
    this.showUpdatePanel = false;
    this.tableData = [];

    if (Number(id) >= 0) {
      this.pokemonService.getPokemonByIdAuthor(Number(id)).subscribe((resp: any) => {
        if (resp.error) {          
          console.log('Error en consulta de pokemons');
        } else {
          this.tableData = resp;
        }
      });
    }
  }

  newPokemon(): void {
    this.selectedPokemon = null;
    this.updateTitle = 'pokemonPanel.create';
    this.showUpdatePanel = true;
  }

  selectOptionInput(data: any, input: string): void {
    this.pokemonForm.controls[input].setValue(data);
  }

  selectAction({ object, action}: (any)): void {
    switch (action) {
      case 0:
        this.newPokemon();
        setTimeout(() => {
          this.pokemonForm.controls['name'].reset(object.name);
          this.pokemonForm.controls['image'].reset(object.image);
          this.pokemonForm.controls['attack'].reset(object.attack);
          this.pokemonForm.controls['defense'].reset(object.defense);
          this.pokemonForm.controls['hp'].reset(object.hp);
          this.pokemonForm.controls['type'].reset(object.type);
          this.pokemonForm.controls['idAuthor'].reset(object.idAuthor);
          this.selectedPokemon = {...object};
          this.updateTitle = 'pokemonPanel.update';
        }, 100);
        break;
      case 1:
        this.deletePokemon(object.id);
        break;
    }
  }
  
  savePokemon(): void {
    if (this.pokemonForm.invalid) return;
    if (this.updateTitle.includes('create')) this.createPokemon();
    if (this.updateTitle.includes('update')) this.updatePokemon();
  }

  createPokemon(): void {
    const data = {...this.pokemonForm.value};
    if (this.tableData.length > 0) data.idAuthor = this.tableData[0].idAuthor;
    this.pokemonService.createPokemon(data).subscribe((resp: any) => {
      if (resp.error) {
        console.log('Error al crear pokemon');
      } else {
        const data = [...this.tableData, resp];
        this.tableData = [];
        this.tableData = data;
        this.pokemonForm.reset;
        this.showUpdatePanel = false;
      }
    });
  }

  updatePokemon(): void {
    const data = {...this.pokemonForm.value, id: this.selectedPokemon?.id || 0};
    this.pokemonService.updatePokemon(data).subscribe((resp: any) => {
      if (resp.error) {
        console.log('Error al actualizar pokemon');
      } else {
        const data = this.tableData.map(pk => {
          if (pk.id === this.selectedPokemon?.id) return resp;
          return pk;
        })
        this.tableData = [];
        this.tableData = data;
        this.pokemonForm.reset;
        this.showUpdatePanel = false;
      }
    });
  }

  cancelProcess(): void {
    this.pokemonForm.reset();
    this.showUpdatePanel = false;
  }

  deletePokemon(id: number): void {
    this.pokemonService.deletePokemon(id).subscribe((resp: any) => {
      if (resp.error) {
        console.log('Error al eliminar pokemon');
      } else {
        const data = this.tableData.filter(x => x.id !== id);
        this.tableData = [];
        this.tableData = data;
      }
    });
  }
}
