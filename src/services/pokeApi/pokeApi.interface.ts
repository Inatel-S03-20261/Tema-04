import type { Pokemon } from "@/schemas/pokemon";

export interface IPokeApiService {
  getPokemonDetails: (id: string) => Promise<Pokemon>;
}