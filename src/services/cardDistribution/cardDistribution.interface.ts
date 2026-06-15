import type { PlayerCards } from "@/schemas/playerCards";

export interface ICardDistributionService {
  getPlayerCards: (playerId?: string) => Promise<PlayerCards>;
}
