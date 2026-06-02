export interface RawPokeApiType {
  slot: number;
  type: { name: string; url: string };
}

export interface RawPokeApiStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface RawPokeApiPokemon {
  id: number;
  name: string;
  types: RawPokeApiType[];
  stats: RawPokeApiStat[];
  sprites: {
    front_default: string;
  };
}
