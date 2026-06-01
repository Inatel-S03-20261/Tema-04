import type { PlayerCards } from "@/schemas/playerCards";
import { pokemonMock } from "@/mocks/pokemon.mock";

export const playerPokemonIdsMock = pokemonMock.map((pokemon) => String(pokemon.id));

export const playerCardsMock: PlayerCards = {
  pokemonsIds: playerPokemonIdsMock,
};
