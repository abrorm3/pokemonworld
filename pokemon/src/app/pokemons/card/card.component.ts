import { Component, Input } from '@angular/core';
import { PokemonDetails } from '../pokemon.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() pokemon!:PokemonDetails;
}
