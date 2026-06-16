import { useContext, type ReactNode } from "react";
import { PokemonComponentContext } from "./Root";

export function Art({ children }: { children: ReactNode }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div
      className={`relative bg-gradient-to-br ${theme.art} flex items-center justify-center`}
      style={{ height: 180 }}
    >
      <div className="absolute inset-2 rounded border border-black/8 pointer-events-none" />

      {children}
    </div>
  );
}
