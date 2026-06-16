import { PokemonApiAdapter } from "@/adapters/PokemonApiAdapter";
import type { RawPokeApiPokemon } from "@/schemas/rawPokeApiPokemon";
import type { Pokemon } from "@/schemas/pokemon";

export function pokemonMapper(data: RawPokeApiPokemon): Pokemon {
  return PokemonApiAdapter.toPokemon(data);
}
