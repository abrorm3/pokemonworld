import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from './pokemons/card-details/card-details.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

const routes: Routes = [
  {path: '', component:PokemonsComponent},
  {path: ':id', component:CardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
