import { pokeApiService } from "@/services/pokeApi";
import { cardDistributionMockService } from "@/mocks/cardDistribution.mock.service";
import { CardDistributionService } from "@/services/cardDistribution/cardDistribution.service";

export const mockStrategy = {
  pokeApiService,
  cardDistributionService: cardDistributionMockService,
};

export const realStrategy = {
  pokeApiService,
  cardDistributionService: new CardDistributionService(),
};