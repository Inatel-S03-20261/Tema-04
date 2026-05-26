import type { PlayerCards } from "@/schemas/playerCards";
import type { ICardDistributionService } from "./cardDistribution.interface";

export class CardDistributionService implements ICardDistributionService {
  async getPlayerCards(token: string) {
    const response = await fetch(import.meta.env.VITE_CARD_DISTRIBUTION_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data as PlayerCards;
  }
}
