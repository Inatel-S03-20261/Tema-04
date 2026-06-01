import type { RawPokeApiPokemon } from "@/schemas/rawPokeApiPokemon";
import type { Pokemon } from "@/schemas/pokemon";

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
