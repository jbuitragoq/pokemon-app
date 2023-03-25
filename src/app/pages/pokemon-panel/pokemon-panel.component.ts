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

  constructor(private formBuilder: FormBuilder,
              private pokemonService: PokemonService) {

    this.createForm();
    this.loadPokemonData();
  }

  createForm(): void {
    this.pokemonForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      image: [ '', Validators.required ],
      attack: [ 0, Validators.required ],
      defense: [ 0, Validators.required ],
      hp: 55,
      type: "Eléctrico",
      idAuthor: 2
    });
  }

  loadPokemonData(): void {
    // this.pokemonService.getPokemon(2).subscribe((data: any) => {
    //   if (data.error) {
    //     console.log('Error en consulta de pokemons');
    //   } else {
    //     this.tableData = data;
    //   }
    // })
  }

  newPokemon(): void {
    this.showUpdatePanel = true;
  }

  selectOptionInput(data: any, input: string): void {
    this.pokemonForm.controls[input].setValue(data);
    console.log('data', data);
  }
  
  savePokemon(): void {

  }

  cancelProcess(): void {
    this.pokemonForm.reset();
    this.showUpdatePanel = false;
  }
}
