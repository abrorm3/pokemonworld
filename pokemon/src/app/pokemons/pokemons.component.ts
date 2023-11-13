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
        this.getPokemonDetails();
      });
  }
  attachUrls() {
    return this.pokemonsRaw.forEach((urls) => this.pokemonsUrl.push(urls.url));
  }
  getPokemonDetails() {
    this.pokemonsUrl.forEach((url) =>
      this.pokemonService.fetchPokemon(url).subscribe((data) => {
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const specialAttack = data.stats[3].base_stat;
        const speed = data.stats[4].base_stat;
        const image = data.sprites.other.dream_world.front_default;

        const pokemonDetails: PokemonDetails = {
          id: data.id,
          name: data.name,
          height: data.height,
          hp: hp,
          attack: attack,
          defense: defense,
          specialAttack: specialAttack,
          speed: speed,
          base_experience: data.base_experience,
          order: data.order,
          weight: data.weight,
          stats: data.stats,
          image: image,
          sprites: data.sprites,
        };

        this.pokemonData.push(pokemonDetails);

      })
    );
  }
}
