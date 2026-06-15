import { useContext } from "react";
import { PokemonComponentContext } from "./Root";

export function Content({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div className={`rounded-2xl border-4 ${theme.border} bg-white shadow-xl p-1.5`}>
      <div className="rounded-xl overflow-hidden border border-black/10">{children}</div>
    </div>
  );
}
