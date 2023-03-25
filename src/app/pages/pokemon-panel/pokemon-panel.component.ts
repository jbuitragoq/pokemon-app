import { Component } from '@angular/core';
import { FieldType } from 'src/app/components/table/table.component';
import { PokemonService } from 'src/app/pages/services/pokemon/pokemon.service';
import { PokemonModel } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-panel',
  templateUrl: './pokemon-panel.component.html',
  styleUrls: ['./pokemon-panel.component.scss']
})
export class PokemonPanelComponent {

  tableHeaders = {
    baseTranslate: 'pokemonPanel.table.',
    headerList: ['name', 'image', 'attack', 'defense', 'actions']
  };
  tableTypes = [
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
  tableData: PokemonModel[] = [];

  constructor(private pokemonService: PokemonService) {
    this.loadPokemonData();
  }

  loadPokemonData() {
    this.pokemonService.getPokemon(2).subscribe((data: any) => {
      if (data.error) {
        console.log('Error en consulta de pokemons');
      } else {
        this.tableData = data;
      }
    })
  }
}
