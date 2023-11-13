import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  PokemonDetails,
  PokemonListResponse,
  PokemonResult,
} from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemonData: PokemonDetails[] = [];

  constructor(private pokemonService: PokemonService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pokemonService.attachData().subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.pokemonService.fetchPokemonDetails().subscribe({
      next: (data: PokemonDetails[]) => {
        this.pokemonData = data;
      },
      error: (error) => {
        console.error('Error in fetchPokemonDetails:', error);
      }
    });
  }

}
