import type { Pokemon } from "@/schemas/pokemon";

interface RawPokeApiType {
  slot: number;
  type: { name: string; url: string };
}

interface RawPokeApiStat {
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

export function pokemonMapper(data: RawPokeApiPokemon): Pokemon {
  return {
    id: data.id,
    name: data.name,
    type: data.types.map((typeInfo) => typeInfo.type.name),
    stats: data.stats.map((statInfo) => ({
      value: statInfo.base_stat,
      name: statInfo.stat.name,
      effort: statInfo.effort,
    })),
    imageUrl: data.sprites.front_default,
  };
}
