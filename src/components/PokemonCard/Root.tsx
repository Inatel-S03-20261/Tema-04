import { createContext, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { typeTheme, type PokemonTheme } from "./constants/pokemon-type-theme";

interface RootProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  pokemonType?: string;
}

export const PokemonComponentContext = createContext<{ theme: PokemonTheme }>({
  theme: typeTheme["normal"],
});

export function Root({
  children,
  pokemonType = "normal",
  ...rest
}: RootProps) {
  const formattedType = pokemonType.toLowerCase();
  const theme = typeTheme[formattedType];

  return (
    <motion.div
      className="relative w-full max-w-[260px] mx-auto cursor-pointer select-none"
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...rest}
    >
      <PokemonComponentContext.Provider value={{ theme }}>
        {children}
      </PokemonComponentContext.Provider>
    </motion.div>
  );
}
