import { motion } from "motion/react";
import { useContext } from "react";
import { PokemonComponentContext } from "./Root";

export function Stats({ atk, def, spd }: { atk?: number; def?: number; spd?: number }) {
  const { theme } = useContext(PokemonComponentContext);

  return (
    <div className="bg-gray-50 px-3 py-2.5 border-t border-black/8 space-y-1.5">
      {[
        { label: "Ataque", value: atk },
        { label: "Defesa", value: def },
        { label: "Veloc.", value: spd },
      ].map(
        ({ label, value }) =>
          typeof value === "number" && (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold w-14 flex-none">{label}</span>

              <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.header}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />
              </div>

              <span className="text-xs font-bold text-gray-600 w-6 text-right">{value}</span>
            </div>
          ),
      )}
    </div>
  );
}
