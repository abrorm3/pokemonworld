export interface PokemonDetails {
  id: number;
  name: string;
  order: number;
  weight: number;
  hp: number;
  stats: { base_stat: number }[];
  image: string;
  height: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  base_experience: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}
