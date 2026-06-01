import type { RawPokeApiPokemon } from "@/mappers/pokemon.mapper";

export interface IPokeApiService {
  getPokemonDetails: (id: string) => Promise<RawPokeApiPokemon>;
}
