import { motion } from "motion/react";
import { useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  imageUrl: string;
  playerId: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onCardClick: (pokemonId: number) => void;
}

const typeColors: Record<string, string> = {
  fire: "from-orange-500 to-red-600",
  water: "from-blue-400 to-blue-600",
  grass: "from-green-400 to-green-600",
  electric: "from-yellow-400 to-yellow-500",
  psychic: "from-purple-400 to-pink-500",
  fighting: "from-red-600 to-orange-700",
  normal: "from-gray-400 to-gray-500",
  poison: "from-purple-600 to-purple-800",
  flying: "from-sky-400 to-indigo-400",
};

const typeTranslations: Record<string, string> = {
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  psychic: "Psíquico",
  fighting: "Lutador",
  normal: "Normal",
  poison: "Venenoso",
  flying: "Voador",
};

export function PokemonCard({ pokemon, onCardClick }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass = typeColors[pokemon.type[0].toLowerCase()] || "from-gray-400 to-gray-600";

  return (
    <motion.div
      className="relative w-full max-w-[320px] mx-auto cursor-pointer select-none"
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCardClick(pokemon.id)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-2xl p-1 shadow-2xl">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Header with name and HP */}
          <div className={`bg-gradient-to-r ${gradientClass} px-4 py-3`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white capitalize tracking-wide">{pokemon.name}</h3>
                <div className="flex gap-1 mt-1">
                  {pokemon.type.map((type) => (
                    <span key={type} className="text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                      {typeTranslations[type.toLowerCase()] || type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className="text-xs text-white/90">HP</span>
                <span className="text-white">{pokemon.hp}</span>
              </div>
            </div>
          </div>

          {/* Pokemon Image */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <motion.div
              className="relative"
              animate={isHovered ? { rotateY: 5, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="w-full h-48 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/40 blur-xl" />
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-yellow-200/30 blur-2xl" />
          </div>

          {/* Stats */}
          <div className="px-4 py-4 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ataque</div>
                <div className="text-gray-900">{pokemon.attack}</div>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Defesa</div>
                <div className="text-gray-900">{pokemon.defense}</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`bg-gradient-to-r ${gradientClass} px-4 py-2`}>
            <div className="text-center text-xs text-white/80">
              Clique para ver detalhes do Pokémon
            </div>
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
        initial={{ opacity: 0, x: "-100%" }}
        animate={isHovered ? { opacity: 1, x: "100%" } : { opacity: 0, x: "-100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
