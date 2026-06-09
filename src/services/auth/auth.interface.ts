import type { AuthResponse } from "@/services/player/player.interface";

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  register(name: string, email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}
