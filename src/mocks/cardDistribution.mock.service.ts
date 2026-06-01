import type { ICardDistributionService } from "@/services/cardDistribution";
import { playerCardsMock } from "@/mocks/cardDistribution.mock";

/**
 * Implementação fake do CardDistributionService para desenvolvimento.
 * Retorna os IDs dos pokémons definidos em pokemons.mock.ts.
 * Para voltar ao serviço real, basta trocar no home.tsx.
 */
export class CardDistributionMockService implements ICardDistributionService {
  async getPlayerCards(_token: string) {
    return playerCardsMock;
  }
}

export const cardDistributionMockService = new CardDistributionMockService();
