import { cardDistributionKeys } from "@/services/cardDistribution/cardDistribution.keys";
import { CardDistributionService } from "@/services/cardDistribution/cardDistribution.service";
import { pokeApiKeys } from "@/services/pokeApi/pokeApi.keys";
import { PokeApiService } from "@/services/pokeApi/pokeApi.service";
import { useQueries, useQuery } from "@tanstack/react-query";

export function usePlayerCards(token: string) {
  const cardDistributionService = new CardDistributionService();
  const pokeApiService = new PokeApiService();

  const { data: playerPokemonsIds, isPending: distributionPending } = useQuery({
    queryKey: cardDistributionKeys.detail(token),
    queryFn: () => cardDistributionService.getPlayerCards(token),
  });

  const pokemonQueries = useQueries({
    queries: (playerPokemonsIds?.pokemonsIds ?? []).map((id) => ({
      queryKey: pokeApiKeys.detail(id),
      queryFn: () => pokeApiService.getPokemonDetails(id),
    })),
  });

  return {
    distributionPending,
    pokemons: pokemonQueries.map((query) => ({
      data: query.data,
      loading: query.isPending,
    })),
  };
}
