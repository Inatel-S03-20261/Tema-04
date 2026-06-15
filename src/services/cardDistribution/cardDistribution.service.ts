import type { PlayerCards } from "@/schemas/playerCards";
import type { ICardDistributionService } from "./cardDistribution.interface";
import { api } from "../api";

export class CardDistributionService implements ICardDistributionService {
  async getPlayerCards() {
    const response = await api.get<PlayerCards>(import.meta.env.VITE_CARD_DISTRIBUTION_API_URL);
    return response.data;
  }
}
