import type { PlayerCards } from "@/schemas/playerCards";
import type { PlayerPokemonCard } from "@/types/PlayerPokemonCard";

export class CardDistributionAdapter {
  static toPokemonList(apiResponse: PlayerCards): PlayerPokemonCard[] {
    // Adapter isola os campos externos da Distribuicao do modelo interno da interface.
    return apiResponse.cards.map((card) => ({
      cardId: card.idCarta,
      pokemonId: card.idPokemon,
    }));
  }
}
