import { useContext } from "react";
import { PokemonComponentContext } from "./Root";

export function Header({ id, name, hp }: { id: number; name: string; hp?: number }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div className={`bg-gradient-to-r ${theme.header} px-3 py-2 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-white">#{String(id).padStart(3, "0")}</span>
        <h3 className="text-white font-extrabold text-base capitalize drop-shadow-sm leading-none">
          {name}
        </h3>
      </div>

      {hp !== undefined && (
        <div className="flex items-center gap-1">
          <span className="text-white/80 text-xs font-bold">HP</span>
          <span className="text-white font-black text-lg leading-none drop-shadow">{hp}</span>
        </div>
      )}
    </div>
  );
}
