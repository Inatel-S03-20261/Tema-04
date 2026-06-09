import { motion } from "motion/react";

export function PokemonCardSkeleton() {
  return (
    <div className="relative w-full max-w-[260px] mx-auto select-none">
      <div className="rounded-2xl border-4 border-gray-200 bg-white shadow-xl p-1.5">
        <div className="rounded-xl overflow-hidden border border-black/10">
          <div className="bg-gray-200 px-3 py-2 flex items-center justify-between h-10">
            <div className="h-4 w-28 rounded bg-gray-300 animate-pulse" />
            <div className="h-4 w-10 rounded bg-gray-300 animate-pulse" />
          </div>
          <div className="bg-gray-100 flex items-center justify-center" style={{ height: 180 }}>
            <motion.div
              className="w-36 h-36 rounded-full bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="bg-white px-3 py-1.5 flex gap-2 border-t border-black/8">
            <div className="h-4 w-14 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-12 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="bg-gray-50 px-3 py-2.5 border-t border-black/8 space-y-2">
            {[70, 50, 85].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2.5 w-14 rounded bg-gray-200 animate-pulse" />
                <div className="flex-1 h-1.5 rounded-full bg-gray-200 animate-pulse" style={{ maxWidth: `${w}%` }} />
                <div className="h-2.5 w-5 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="bg-gray-200 px-3 py-1.5 h-7" />
        </div>
      </div>
    </div>
  );
}
