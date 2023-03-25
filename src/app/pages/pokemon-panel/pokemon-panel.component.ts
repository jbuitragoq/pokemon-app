import { Component } from '@angular/core';
import { FieldType } from 'src/app/components/table/table.component';

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
  ]
  tableData = [
    {
      name: 'name1',
      image: 'image1',
      attack: 'attack1',
      defense: 'defense1',
      actions: 'actions1',
    },
    {
      name: 'name2',
      image: 'image2',
      attack: 'attack2',
      defense: 'defense2',
      actions: 'actions2',
    }
  ]

}
