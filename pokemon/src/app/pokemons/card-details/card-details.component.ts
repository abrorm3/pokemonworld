import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../pokemon.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  pokemonId: string = '';
  pokemon: PokemonDetails | null =null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonId = id !== null ? id : '';

    this.pokemonService
      .fetchPokemonById(this.pokemonId)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        console.log(this.pokemon);
      });
  }
}
