import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { authMockService } from "./services/auth/auth.mock.service";
import { AuthProvider, useAuth } from "./contexts/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

type AuthScreen = "login" | "register";

function AppRouter() {
  const { user, isLoadingUser } = useAuth();

  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");

  if (isLoadingUser) {
    return null;
  }

  if (user) {
    return (
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Home />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {authScreen === "login" ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.25 }}
        >
          <Login onGoToRegister={() => setAuthScreen("register")} />
        </motion.div>
      ) : (
        <motion.div
          key="register"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Register onGoToLogin={() => setAuthScreen("login")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider authService={authMockService}>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
