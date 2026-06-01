import { cardDistributionKeys, type ICardDistributionService } from "@/services/cardDistribution";
import { pokemonMapper, type RawPokeApiPokemon } from "@/mappers/pokemon.mapper";
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
    data: playerPokemonsIds,
    isPending: distributionPending,
    error: distributionError,
  } = useQuery({
    queryKey: cardDistributionKeys.detail(token),
    queryFn: () => cardDistributionService.getPlayerCards(token),
    enabled: Boolean(token),
  });

  const pokemonQueries = useQueries({
    queries: (playerPokemonsIds?.pokemonsIds ?? []).map((id) => ({
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
      data: query.data,
      loading: query.isPending,
      error: query.error,
      id: playerPokemonsIds?.pokemonsIds[index] ?? null,
    })),
  };
}
