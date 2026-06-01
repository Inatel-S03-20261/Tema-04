export interface Player {
  id: string;
  name: string;
  email: string;
  role: "PLAYER";
}

export interface AuthResponse {
  token: string;
  user: Player;
}

export interface IPlayerService {
  login(email: string, password: string): Promise<AuthResponse>;
  register(name: string, email: string, password: string): Promise<AuthResponse>;
  getProfile(token: string): Promise<Player>;
}
