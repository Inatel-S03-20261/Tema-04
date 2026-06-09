import { mockLogin, mockRegister } from "@/mocks/auth.mock";
import type { IAuthService } from "./auth.interface";

const MOCK_DELAY_MS = 600;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}

export class AuthMockService implements IAuthService {
  async login(email: string, password: string) {
    await delay();
    return mockLogin(email, password);
  }

  async register(name: string, email: string, password: string) {
    await delay();
    return mockRegister(name, email, password);
  }

  async logout() {
    await delay();
  }
}

export const authMockService = new AuthMockService();
