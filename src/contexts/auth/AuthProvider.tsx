import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { IAuthService, UserLogin, UserRegister } from "@/services/auth";
import { clearAuthToken, getAuthToken, registerLogoutCallback, setAuthToken } from "@/services/api";

interface AuthProviderProps {
  children: ReactNode;
  authService: IAuthService;
}

const USER_QUERY_KEY = ["auth", "user"];

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const token = getAuthToken();

  const { data: currentUser = null, isLoading: isLoadingUser } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => authService.validateToken(token || ""),
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setAuthToken(response.token);
      queryClient.setQueryData(USER_QUERY_KEY, response.user);
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      setAuthToken(response.token);
      queryClient.setQueryData(USER_QUERY_KEY, response.user);
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  });

  const clearSession = () => {
    clearAuthToken();
    queryClient.setQueryData(USER_QUERY_KEY, null);
    queryClient.cancelQueries();
    queryClient.clear();
  };

  const signIn = async (input: UserLogin) => loginMutation.mutate(input);
  const register = async (input: UserRegister) => registerMutation.mutate(input);

  const isPendingLogin = loginMutation.isPending || registerMutation.isPending;

  useEffect(() => {
    registerLogoutCallback(clearSession);
  }, []);

  const contextValue = useMemo(
    () => ({
      user: currentUser,
      isPendingLogin,
      isLoadingUser,
      signIn,
      register,
      signOut: clearSession,
    }),
    [currentUser, isPendingLogin, isLoadingUser, signIn, register, clearSession],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
