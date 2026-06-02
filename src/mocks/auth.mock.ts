import { mockPlayer } from "@/mocks/player.mock";
import type { AuthResponse } from "@/services/player/player.interface";

export type MockAuthResponse = AuthResponse;

function isBlank(value: string) {
  return value.trim().length === 0;
}

export async function mockLogin(email: string, password: string): Promise<MockAuthResponse> {
  if (isBlank(email) || isBlank(password)) {
    throw new Error("Credenciais inválidas");
  }

  return {
    token: "fake-jwt-token-player-001",
    user: {
      ...mockPlayer,
      email,
    },
  };
}

export async function mockRegister(
  name: string,
  email: string,
  password: string,
): Promise<MockAuthResponse> {
  if (isBlank(name) || isBlank(email) || isBlank(password)) {
    throw new Error("Dados de cadastro inválidos");
  }

  return {
    token: "fake-jwt-token-player-new",
    user: {
      id: "player-new",
      name,
      email,
      role: "PLAYER",
    },
  };
}
