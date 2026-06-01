import type { Player } from "@/services/player/player.interface";

export type MockPlayer = Player;

export const mockPlayer: MockPlayer = {
  id: "player-001",
  name: "Grupo 3",
  email: "grupo3@inatel.br",
  token: "fake-token-player-001",
};
