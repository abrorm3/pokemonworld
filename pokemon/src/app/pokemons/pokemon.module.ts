import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PokemonsComponent, CardComponent],
  imports: [CommonModule, HttpClientModule],
})
export class PokemonModule {}
