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
  currPage: number = 6;
  loading:boolean = false;

  constructor(private pokemonService: PokemonService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.triggerFetch();
  }
  triggerFetch(){
    this.loading =true;
    this.pokemonService.attachData(this.currPage).subscribe(() => {
      this.getData();
      this.loading =false;
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
  nextPage(){
    this.loading = true;
    this.currPage= this.currPage + 6;
    this.triggerFetch()
  }

}
