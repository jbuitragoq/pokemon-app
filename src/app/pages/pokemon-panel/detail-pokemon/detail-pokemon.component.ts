import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent {

  @Output() close = new EventEmitter<void>();

}
