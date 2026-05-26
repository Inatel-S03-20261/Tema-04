import { motion } from "motion/react";

interface PokemonErrorCardProps {
  message: string;
}

export function PokemonErrorCard({ message }: PokemonErrorCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-[320px] mx-auto select-none"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative bg-gradient-to-br from-gray-200 via-gray-100 to-white rounded-2xl p-1 shadow-2xl grayscale">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 px-4 py-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white tracking-wide">Carta indisponível</h3>
                <div className="flex gap-1 mt-1">
                  <span className="text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                    Erro
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className="text-xs text-white/90">HP</span>
                <span className="text-white">--</span>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="flex items-center justify-center">
              <img
                src="/sad-pikachu.png"
                alt="Erro ao carregar cartas"
                className="w-48 h-48 object-contain grayscale contrast-125"
              />
            </div>

            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/40 blur-xl" />
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gray-300/30 blur-2xl" />
          </div>

          <div className="px-4 py-4 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ataque</div>
                <div className="text-gray-900">--</div>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Defesa</div>
                <div className="text-gray-900">--</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 px-4 py-2">
            <div className="text-center text-xs text-white/80">{message}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}