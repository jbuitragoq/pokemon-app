import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonPanelComponent } from './pokemon-panel.component';

const routes: Routes = [
  { path: '', component: PokemonPanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonPanelRoutesModule { }