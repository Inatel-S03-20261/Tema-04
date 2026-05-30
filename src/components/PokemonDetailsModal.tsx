import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Pokemon } from "@/schemas/pokemon";

interface PokemonDetailsModalProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
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
  fairy: "from-pink-300 to-pink-500",
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
  fairy: "Fada",
};

const statTranslations: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Atq. Especial",
  "special-defense": "Def. Especial",
  speed: "Velocidade",
};

const statColors: Record<string, string> = {
  hp: "bg-green-400",
  attack: "bg-red-400",
  defense: "bg-blue-400",
  "special-attack": "bg-purple-400",
  "special-defense": "bg-indigo-400",
  speed: "bg-yellow-400",
};

const MAX_STAT = 255;

export function PokemonDetailsModal({ pokemon, isOpen, onClose }: PokemonDetailsModalProps) {
  const gradientClass =
    typeColors[pokemon.type[0].toLowerCase()] ?? "from-gray-400 to-gray-600";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header com gradiente do tipo */}
              <div className={`bg-gradient-to-br ${gradientClass} px-6 pt-8 pb-20 relative`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex gap-2 mb-2">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className="text-xs text-white bg-white/25 px-3 py-1 rounded-full font-medium"
                    >
                      {typeTranslations[type.toLowerCase()] ?? type}
                    </span>
                  ))}
                </div>

                <h2 className="text-white text-3xl font-bold capitalize">{pokemon.name}</h2>
                <p className="text-white/70 text-sm mt-0.5">#{String(pokemon.id).padStart(3, "0")}</p>

                {/* Círculos decorativos */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
              </div>

              {/* Imagem flutuando sobre o header */}
              <div className="relative -mt-16 flex justify-center pointer-events-none">
                <motion.img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="w-36 h-36 object-contain drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Stats */}
              <div className="px-6 pb-6 pt-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Estatísticas Base
                </h3>
                <div className="flex flex-col gap-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-28 shrink-0">
                        {statTranslations[stat.name] ?? stat.name}
                      </span>
                      <span className="text-sm font-bold text-gray-700 w-8 text-right shrink-0">
                        {stat.value}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${statColors[stat.name] ?? "bg-gray-400"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.value / MAX_STAT) * 100}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
