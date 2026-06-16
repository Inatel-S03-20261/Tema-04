import type { ICardDistributionService } from "@/services/cardDistribution";
import { playerCardsMock } from "@/mocks/cardDistribution.mock";

/**
 * Implementação fake do CardDistributionService para desenvolvimento.
 * Retorna as cartas distribuídas para o jogador autenticado.
 * Para voltar ao serviço real, basta trocar no home.tsx.
 */
export class CardDistributionMockService implements ICardDistributionService {
  async getPlayerCards(playerId?: string) {
    if (!playerId || !playerId.trim()) {
      throw new Error("ID do jogador é obrigatório para obter as cartas.");
    }

    return playerCardsMock;
  }
}

export const cardDistributionMockService = new CardDistributionMockService();
