import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Sword, Shield, Sparkles, MapPin, Ruler } from "lucide-react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  imageUrl: string;
  playerId: number;
  habitat?: string;
  height?: number;
  weight?: number;
  abilities?: string[];
  description?: string;
}

interface PokemonDetailsModalProps {
  pokemon: Pokemon | null;
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

export function PokemonDetailsModal({ pokemon, onClose }: PokemonDetailsModalProps) {
  if (!pokemon) return null;

  const gradientClass = typeColors[pokemon.type[0].toLowerCase()] || "from-gray-400 to-gray-600";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header with gradient */}
          <div className={`bg-gradient-to-br ${gradientClass} px-6 py-8 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl" />

            <div className="relative flex items-center gap-4">
              <motion.img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="w-24 h-24 object-contain drop-shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <div>
                <h2 className="text-white mb-2 capitalize">{pokemon.name}</h2>
                <div className="flex gap-2">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-semibold"
                    >
                      {typeTranslations[type.toLowerCase()] || type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
                <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-gray-900">{pokemon.hp}</div>
                <div className="text-xs text-gray-600 mt-1">HP</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                <Sword className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-gray-900">{pokemon.attack}</div>
                <div className="text-xs text-gray-600 mt-1">Ataque</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-gray-900">{pokemon.defense}</div>
                <div className="text-xs text-gray-600 mt-1">Defesa</div>
              </div>
            </div>

            {/* Description */}
            {pokemon.description && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{pokemon.description}</p>
              </div>
            )}

            {/* Additional info */}
            <div className="space-y-3">
              {pokemon.habitat && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Habitat</span>
                  </div>
                  <span className="text-gray-900 capitalize">{pokemon.habitat}</span>
                </div>
              )}

              {pokemon.height && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Altura</span>
                  </div>
                  <span className="text-gray-900">{pokemon.height} m</span>
                </div>
              )}

              {pokemon.weight && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Peso</span>
                  <span className="text-gray-900">{pokemon.weight} kg</span>
                </div>
              )}

              {pokemon.abilities && pokemon.abilities.length > 0 && (
                <div className="py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Habilidades</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
