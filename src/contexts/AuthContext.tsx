import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Player } from "@/services/player/player.interface";
import type { IAuthService } from "@/services/auth/auth.interface";

interface AuthState {
  user: Player | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  authService: IAuthService;
}

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login(email, password);
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });
    },
    [authService],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await authService.register(name, email, password);
      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });
    },
    [authService],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setAuthState({ user: null, token: null, isAuthenticated: false });
  }, [authService]);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
