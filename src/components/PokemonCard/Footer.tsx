import { useContext, type ReactNode } from "react";
import { PokemonComponentContext } from "./Root";

export function Footer({ children }: { children: ReactNode }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div className={`bg-gradient-to-r ${theme.header} px-3 py-1.5 text-center`}>{children}</div>
  );
}
