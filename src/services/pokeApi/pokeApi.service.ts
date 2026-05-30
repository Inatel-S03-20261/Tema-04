import { pokemonMapper, type RawPokeApiPokemon } from "@/mappers/pokemon.mapper";
import type { IPokeApiService } from "./pokeApi.interface";

export class PokeApiService implements IPokeApiService {
  async getPokemonDetails(id: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details for ID: ${id}`);
    }

    const data: RawPokeApiPokemon = await response.json();

    return pokemonMapper(data);
  }
}
