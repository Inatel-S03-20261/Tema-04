import type { PlayerCards } from "@/schemas/playerCards";

export interface ICardDistributionService {
  getPlayerCards: (token: string) => Promise<PlayerCards>;
}
