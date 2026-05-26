import { motion } from "motion/react";

export function PokemonCardSkeleton() {
  return (
    <motion.div
      className="relative w-full max-w-[320px] mx-auto select-none"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative rounded-2xl p-1 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 shadow-2xl">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-gray-300 to-gray-200">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded-full bg-white/60" />
                <div className="flex gap-2">
                  <div className="h-5 w-14 rounded-full bg-white/50" />
                  <div className="h-5 w-16 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="h-8 w-14 rounded-lg bg-white/50" />
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/50 blur-xl" />
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gray-200/60 blur-2xl" />
          </div>

          <div className="bg-gradient-to-r from-gray-300 to-gray-200 px-4 py-2">
            <div className="h-3 w-36 mx-auto rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}