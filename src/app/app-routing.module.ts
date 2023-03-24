import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokemon-panel',
    loadChildren: () => import('./pages/pokemon-panel/pokemon-panel.module').then(mod => mod.PokemonPanelModule)
  },
  {
    path: '**', redirectTo: 'pokemon-panel', pathMatch: 'full'
  },
  {
    path: '', redirectTo: 'pokemon-panel', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
