export interface Player {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface IPlayerService {
  login(email: string, password: string): Promise<Player>;
  register(name: string, email: string, password: string): Promise<Player>;
  getProfile(token: string): Promise<Player>;
}
