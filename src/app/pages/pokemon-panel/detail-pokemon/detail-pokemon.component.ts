import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonModel } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent {
  @Input() pokemon!: PokemonModel | null;
  @Output() close = new EventEmitter<void>();
}
