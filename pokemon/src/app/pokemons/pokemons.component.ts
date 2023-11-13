import { Component, OnInit } from '@angular/core';
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
  pokemonsRaw: PokemonResult[] = [];
  pokemonsUrl: string[] = [];
  pokemonData: PokemonDetails[] = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.pokemonService
      .fetchPokemons()
      .subscribe((data: PokemonListResponse) => {
        this.pokemonsRaw = data.results;
        this.attachUrls();
        this.getPokemon();
      });
  }
  attachUrls() {
    return this.pokemonsRaw.forEach((urls) => this.pokemonsUrl.push(urls.url));
  }
  getPokemon() {
    this.pokemonsUrl.forEach((url) =>
      this.pokemonService.fetchPokemon(url).subscribe((data)=>{
        this.pokemonData.push(data);
        console.log(this.pokemonData);

      })
    );
  }
}
