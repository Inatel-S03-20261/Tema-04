import type { RawPokeApiPokemon } from "@/mappers/pokemon.mapper";
import type { IPokeApiService } from "./pokeApi.interface";

export class PokeApiService implements IPokeApiService {
  async getPokemonDetails(id: string): Promise<RawPokeApiPokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details for ID: ${id}`);
    }

    return response.json() as Promise<RawPokeApiPokemon>;
  }
}
