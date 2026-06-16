import { cardDistributionKeys, type ICardDistributionService } from "@/services/cardDistribution";
import { CardDistributionAdapter } from "@/adapters/CardDistributionAdapter";
import { PokemonApiAdapter } from "@/adapters/PokemonApiAdapter";
import { pokeApiKeys, type IPokeApiService } from "@/services/pokeApi";
import { useQueries, useQuery } from "@tanstack/react-query";

type UsePlayerCardsDeps = {
  cardDistributionService: ICardDistributionService;
  pokeApiService: IPokeApiService;
  playerId?: string;
};

export function usePlayerCards({
  cardDistributionService,
  pokeApiService,
  playerId,
}: UsePlayerCardsDeps) {
  const {
    data: playerCards,
    isPending: distributionPending,
    error: distributionError,
  } = useQuery({
    queryKey: cardDistributionKeys.detail(playerId!),
    queryFn: () => cardDistributionService.getPlayerCards(playerId || ""),
    enabled: Boolean(playerId),
  });

  const distributedCards = playerCards
    ? CardDistributionAdapter.toPokemonList(playerCards)
    : [];
  const pokemonIds = distributedCards.map((card) => card.pokemonId);

  const pokemonQueries = useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: pokeApiKeys.detail(id),
      queryFn: async () => {
        const rawPokemon = await pokeApiService.getPokemonDetails(id);
        return PokemonApiAdapter.toPokemon(rawPokemon);
      },
    })),
  });

  return {
    distributionPending,
    distributionError,
    pokemons: pokemonQueries.map((query, index) => ({
      cardId: distributedCards[index]?.cardId ?? null,
      pokemonId: distributedCards[index]?.pokemonId ?? null,
      data: query.data,
      loading: query.isPending,
      error: query.error,
    })),
  };
}
