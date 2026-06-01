import { mockLogin, mockRegister } from "@/mocks/auth.mock";
import { mockPlayer } from "@/mocks/player.mock";
import type { IPlayerService } from "./player.interface";

const MOCK_DELAY_MS = 250;

function waitMockDelay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}

export class PlayerMockService implements IPlayerService {
  async login(email: string, password: string) {
    await waitMockDelay();
    return mockLogin(email, password);
  }

  async register(name: string, email: string, password: string) {
    await waitMockDelay();
    return mockRegister(name, email, password);
  }

  async getProfile(token: string) {
    await waitMockDelay();

    return {
      ...mockPlayer,
      token,
    };
  }
}

export const playerMockService = new PlayerMockService();
