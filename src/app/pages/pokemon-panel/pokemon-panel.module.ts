import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonPanelRoutesModule } from './pokemon-panel.routes';
import { ComponentsModule } from 'src/app/components/components.module';
import { PokemonPanelComponent } from './pokemon-panel.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';

@NgModule({
    declarations: [
        PokemonPanelComponent,
        DetailPokemonComponent
    ],
    imports: [
        CommonModule,
        PokemonPanelRoutesModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ComponentsModule
    ]
})
export class PokemonPanelModule { }
  