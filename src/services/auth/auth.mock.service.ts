import { mockLogin, mockRegister, mockValidateToken } from "@/mocks/auth.mock";
import type { IAuthService, UserLogin, UserRegister } from "./auth.interface";

const MOCK_DELAY_MS = 600;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}

export class AuthMockService implements IAuthService {
  async login({ email, password }: UserLogin) {
    await delay();
    return mockLogin(email, password);
  }

  async register({ name, email, password }: UserRegister) {
    await delay();
    return mockRegister(name, email, password);
  }

  async logout() {
    await delay();
  }

  async validateToken(token: string) {
    await delay();
    return mockValidateToken(token);
  }
}

export const authMockService = new AuthMockService();
