import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDetailsComponent } from './card-details/card-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonsComponent, CardComponent, CardDetailsComponent],
  imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule, RouterModule],
})
export class PokemonModule {}
