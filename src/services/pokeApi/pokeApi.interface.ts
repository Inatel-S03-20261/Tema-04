import type { RawPokeApiPokemon } from "@/schemas/rawPokeApiPokemon";

export interface IPokeApiService {
  getPokemonDetails: (id: string) => Promise<RawPokeApiPokemon>;
}
