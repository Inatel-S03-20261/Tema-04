import { motion, AnimatePresence } from "motion/react";
import { X, Trophy, Star, Zap } from "lucide-react";

interface Player {
  id: number;
  name: string;
  avatar: string;
  level: number;
  wins: number;
  totalBattles: number;
  badges: number;
  favoriteType: string;
  joinDate: string;
}

interface PlayerDetailsModalProps {
  player: Player | null;
  onClose: () => void;
}

export function PlayerDetailsModal({ player, onClose }: PlayerDetailsModalProps) {
  if (!player) return null;

  const winRate = ((player.wins / player.totalBattles) * 100).toFixed(1);

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
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full shadow-lg">
                  <span className="text-xs">Lv {player.level}</span>
                </div>
              </div>
              <div>
                <h2 className="text-white mb-1">{player.name}</h2>
                <p className="text-white/80 text-sm">Treinador desde {player.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-gray-900">{player.wins}</div>
                <div className="text-xs text-gray-600 mt-1">Vitórias</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-gray-900">{player.badges}</div>
                <div className="text-xs text-gray-600 mt-1">Insígnias</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-gray-900">{winRate}%</div>
                <div className="text-xs text-gray-600 mt-1">Taxa de Vitória</div>
              </div>
            </div>

            {/* Additional info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Total de Batalhas</span>
                <span className="text-gray-900">{player.totalBattles}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Tipo Favorito</span>
                <span className="text-gray-900 capitalize">{player.favoriteType}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Nível do Treinador</span>
                <span className="text-gray-900">{player.level}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg transition-shadow">
                Desafiar
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                Ver Perfil
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
