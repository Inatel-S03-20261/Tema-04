import { useContext } from "react";
import { typeTranslations } from "./constants/pokemon-type-translations";
import { PokemonComponentContext } from "./Root";

export function TypeList({ types }: { types: string[] }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div className="bg-white px-3 py-1.5 flex items-center gap-1 border-t border-black/8">
      {types.map((t) => (
        <span
          key={t}
          className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badge} ${theme.badgeText}`}
        >
          {typeTranslations[t.toLowerCase()] ?? t}
        </span>
      ))}
    </div>
  );
}
