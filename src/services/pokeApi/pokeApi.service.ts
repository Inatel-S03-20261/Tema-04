import type { IPokeApiService } from "./pokeApi.interface";
import type { Pokemon } from "@/schemas/pokemon";

export class PokeApiService implements IPokeApiService {
  async getPokemonDetails(id: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details for ID: ${id}`);
    }

    const data = await response.json();

    const formattedData: Pokemon = {
      id: data.id,
      name: data.name,
      type: data.types.map(
        (typeInfo: { slot: number; type: { name: string; url: string } }) => typeInfo.type.name,
      ),
      stats: data.stats.map(
        (statInfo: { base_stat: number; effort: number; stat: { name: string; url: string } }) => ({
          value: statInfo.base_stat,
          name: statInfo.stat.name,
          effort: statInfo.effort,
        }),
      ),
      imageUrl: data.sprites.front_default,
    };

    return formattedData;
  }
}
