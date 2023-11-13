import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PokemonDetails, PokemonListResponse, PokemonResult } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  pokemonsRaw: PokemonResult[] = [];
  pokemonsUrl: string[] = [];

  constructor(private http: HttpClient) {}

  fetchAPI(limitNumber: number): Observable<PokemonListResponse> {
    let params = new HttpParams();
    params = params.set('?limit', limitNumber);
    return this.http.get<PokemonListResponse>(this.baseUrl+params);
  }

  attachData(limitNum:number): Observable<void> {
    return this.fetchAPI(limitNum).pipe(
      map((data: PokemonListResponse) => {
        this.pokemonsRaw = data.results;
        this.attachUrls();
      })
    );
  }

  fetchPokemon(url: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(url).pipe(
      catchError((error) => {
        console.error('Error in fetchPokemon:', error);
        // Return a default PokemonDetails object or handle the error as needed
        return of({
          id: 0,
          name: 'Unknown',
          height: 0,
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          speed: 0,
          base_experience: 0,
          order: 0,
          weight: 0,
          stats: [],
          image: '',
          sprites: { other: { dream_world: { front_default: '' } } },
        });
      })
    );
  }

  attachUrls(): void {
    this.pokemonsUrl = this.pokemonsRaw.map((pokemon) => pokemon.url);
  }

  fetchPokemonDetails(): Observable<PokemonDetails[]> {
    const observables: Observable<PokemonDetails>[] = this.pokemonsUrl.map((url) =>
      this.fetchPokemon(url).pipe(
        map((data) => {
          const hp = data.stats[0].base_stat;
          const attack = data.stats[1].base_stat;
          const defense = data.stats[2].base_stat;
          const specialAttack = data.stats[3].base_stat;
          const speed = data.stats[4].base_stat;
          const image = data.sprites.other.dream_world.front_default;

          return {
            id: data.id,
            name: data.name,
            height: data.height,
            hp,
            attack,
            defense,
            specialAttack,
            speed,
            base_experience: data.base_experience,
            order: data.order,
            weight: data.weight,
            stats: data.stats,
            image,
            sprites: data.sprites,
          };
        })
      )
    );
    return forkJoin(observables);
  }
}
