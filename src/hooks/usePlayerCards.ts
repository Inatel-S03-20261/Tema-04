import { cardDistributionKeys, type ICardDistributionService } from "@/services/cardDistribution";
import { pokemonMapper } from "@/mappers/pokemon.mapper";
import type { RawPokeApiPokemon } from "@/schemas/rawPokeApiPokemon";
import { pokeApiKeys, type IPokeApiService } from "@/services/pokeApi";
import { useQueries, useQuery } from "@tanstack/react-query";

type UsePlayerCardsDeps = {
  cardDistributionService: ICardDistributionService;
  pokeApiService: IPokeApiService;
};

export function usePlayerCards(
  token: string,
  { cardDistributionService, pokeApiService }: UsePlayerCardsDeps,
) {
  const {
    data: playerCards,
    isPending: distributionPending,
    error: distributionError,
  } = useQuery({
    queryKey: cardDistributionKeys.detail(token),
    queryFn: () => cardDistributionService.getPlayerCards(token),
    enabled: Boolean(token),
  });

  const distributedCards = playerCards?.cards ?? [];
  const pokemonIds = distributedCards.map((card) => card.idPokemon);

  const pokemonQueries = useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: pokeApiKeys.detail(id),
      queryFn: async () => {
        const rawPokemon: RawPokeApiPokemon = await pokeApiService.getPokemonDetails(id);
        return pokemonMapper(rawPokemon);
      },
    })),
  });

  return {
    distributionPending,
    distributionError,
    pokemons: pokemonQueries.map((query, index) => ({
      idCarta: distributedCards[index]?.idCarta ?? null,
      idPokemon: distributedCards[index]?.idPokemon ?? null,
      data: query.data,
      loading: query.isPending,
      error: query.error,
    })),
  };
}
