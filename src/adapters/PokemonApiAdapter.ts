import type { Pokemon } from "@/schemas/pokemon";
import type { RawPokeApiPokemon } from "@/schemas/rawPokeApiPokemon";

export class PokemonApiAdapter {
  static toPokemon(data: RawPokeApiPokemon): Pokemon {
    // Adapter isola o JSON bruto da PokeAPI do modelo Pokemon usado pela interface.
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
}
