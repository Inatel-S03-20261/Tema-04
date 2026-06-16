import type { UserLogin, UserRegister } from "@/services/auth";
import type { Player } from "@/services/player";
import { createContext } from "react";

export interface AuthContextType {
  user: Player | null;
  isPendingLogin: boolean;
  isLoadingUser: boolean;
  signIn: (input: UserLogin) => Promise<void>;
  register: (input: UserRegister) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
