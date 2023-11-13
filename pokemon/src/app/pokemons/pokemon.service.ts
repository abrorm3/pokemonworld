import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails, PokemonListResponse } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  constructor(private http:HttpClient) { }

  fetchPokemons(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(this.baseUrl);
  }
  fetchPokemon(url:string){
    return this.http.get<PokemonDetails>(url)
  }


}
