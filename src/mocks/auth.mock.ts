import { mockPlayer, type MockPlayer } from "@/mocks/player.mock";

export type MockAuthResponse = MockPlayer;

export async function mockLogin(email: string, _password: string): Promise<MockAuthResponse> {
  return {
    ...mockPlayer,
    email,
  };
}

export async function mockRegister(
  name: string,
  email: string,
  _password: string,
): Promise<MockAuthResponse> {
  return {
    id: "player-new",
    name,
    email,
    token: "fake-token-player-new",
  };
}
