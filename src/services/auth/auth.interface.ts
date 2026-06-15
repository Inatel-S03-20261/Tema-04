import type { Player } from "@/services/player";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: Player;
}

export interface IAuthService {
  validateToken(token: string): Promise<Player>;
  login(payload: UserLogin): Promise<AuthResponse>;
  register(payload: UserRegister): Promise<AuthResponse>;
  logout(): Promise<void>;
}
