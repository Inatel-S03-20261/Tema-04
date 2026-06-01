import type { ICardDistributionService } from "@/services/cardDistribution";
import { playerCardsMock } from "@/mocks/cardDistribution.mock";

/**
 * Implementação fake do CardDistributionService para desenvolvimento.
 * Retorna as cartas distribuídas para o jogador autenticado.
 * Para voltar ao serviço real, basta trocar no home.tsx.
 */
export class CardDistributionMockService implements ICardDistributionService {
  async getPlayerCards(token: string) {
    if (!token.trim()) {
      throw new Error("Token de acesso inválido");
    }

    return playerCardsMock;
  }
}

export const cardDistributionMockService = new CardDistributionMockService();
