import { motion } from "motion/react";
import { useState } from "react";
import { PokemonErrorCard } from "./PokemonErrorCard";
import type { Pokemon } from "@/schemas/pokemon";
import { PokemonCardSkeleton } from "./PokemonCardSkeleton";
import { PokemonDetailsModal } from "./PokemonDetailsModal";

interface PokemonCardProps {
  pokemon: {
    data?: Pokemon;
    error: Error | null;
    loading: boolean;
  };
}

const typeTheme: Record<string, { border: string; header: string; art: string; badge: string; badgeText: string }> = {
  fire:     { border: "border-orange-400",   header: "from-orange-300 to-red-400",      art: "from-orange-100 via-amber-50 to-yellow-100",   badge: "bg-orange-500",   badgeText: "text-white" },
  water:    { border: "border-blue-400",     header: "from-sky-300 to-blue-500",        art: "from-sky-100 via-blue-50 to-cyan-100",         badge: "bg-blue-500",     badgeText: "text-white" },
  grass:    { border: "border-green-400",    header: "from-lime-300 to-green-500",      art: "from-lime-100 via-green-50 to-emerald-100",    badge: "bg-green-500",    badgeText: "text-white" },
  electric: { border: "border-yellow-400",   header: "from-yellow-200 to-amber-400",    art: "from-yellow-50 via-amber-50 to-yellow-100",    badge: "bg-yellow-400",   badgeText: "text-yellow-900" },
  psychic:  { border: "border-fuchsia-400",  header: "from-fuchsia-300 to-purple-500",  art: "from-fuchsia-50 via-pink-50 to-purple-100",   badge: "bg-fuchsia-500",  badgeText: "text-white" },
  fighting: { border: "border-red-500",      header: "from-red-400 to-orange-600",      art: "from-red-50 via-orange-50 to-amber-100",       badge: "bg-red-600",      badgeText: "text-white" },
  poison:   { border: "border-purple-500",   header: "from-purple-400 to-violet-600",   art: "from-purple-50 via-violet-50 to-indigo-100",   badge: "bg-purple-600",   badgeText: "text-white" },
  flying:   { border: "border-sky-300",      header: "from-sky-200 to-indigo-400",      art: "from-sky-50 via-cyan-50 to-blue-100",          badge: "bg-sky-400",      badgeText: "text-white" },
  rock:     { border: "border-stone-400",    header: "from-stone-300 to-stone-500",     art: "from-stone-50 via-gray-50 to-stone-100",       badge: "bg-stone-500",    badgeText: "text-white" },
  ground:   { border: "border-amber-500",    header: "from-amber-300 to-yellow-600",    art: "from-amber-50 via-yellow-50 to-orange-100",    badge: "bg-amber-600",    badgeText: "text-white" },
  ice:      { border: "border-cyan-300",     header: "from-cyan-200 to-blue-400",       art: "from-cyan-50 via-blue-50 to-sky-100",          badge: "bg-cyan-400",     badgeText: "text-white" },
  bug:      { border: "border-lime-500",     header: "from-lime-300 to-green-600",      art: "from-lime-50 via-green-50 to-emerald-100",     badge: "bg-lime-600",     badgeText: "text-white" },
  ghost:    { border: "border-indigo-500",   header: "from-indigo-400 to-violet-700",   art: "from-indigo-50 via-purple-50 to-violet-100",   badge: "bg-indigo-700",   badgeText: "text-white" },
  dragon:   { border: "border-blue-700",     header: "from-blue-500 to-indigo-700",     art: "from-blue-50 via-indigo-50 to-violet-100",     badge: "bg-blue-700",     badgeText: "text-white" },
  dark:     { border: "border-neutral-600",  header: "from-neutral-500 to-neutral-800", art: "from-neutral-100 via-gray-50 to-stone-100",    badge: "bg-neutral-800",  badgeText: "text-white" },
  steel:    { border: "border-slate-400",    header: "from-slate-300 to-slate-500",     art: "from-slate-50 via-gray-50 to-slate-100",       badge: "bg-slate-500",    badgeText: "text-white" },
  fairy:    { border: "border-pink-300",     header: "from-pink-200 to-rose-400",       art: "from-pink-50 via-rose-50 to-fuchsia-100",      badge: "bg-pink-400",     badgeText: "text-white" },
  normal:   { border: "border-gray-400",     header: "from-gray-200 to-gray-400",       art: "from-gray-50 via-slate-50 to-gray-100",        badge: "bg-gray-400",     badgeText: "text-white" },
};

const typeTranslations: Record<string, string> = {
  fire: "Fogo", water: "Água", grass: "Planta", electric: "Elétrico",
  psychic: "Psíquico", fighting: "Lutador", normal: "Normal",
  poison: "Veneno", flying: "Voador", fairy: "Fada", rock: "Pedra",
  ground: "Terra", ice: "Gelo", bug: "Inseto", ghost: "Fantasma",
  dragon: "Dragão", dark: "Sombrio", steel: "Aço",
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const pokemonData = pokemon.data;

  if (pokemon.error) return <PokemonErrorCard message={pokemon.error.message} />;
  if (pokemon.loading || !pokemonData) return <PokemonCardSkeleton />;

  const primaryType = pokemonData.type[0]?.toLowerCase() ?? "normal";
  const theme = typeTheme[primaryType] ?? typeTheme.normal;

  const hp  = pokemonData.stats.find((s) => s.name === "hp")?.value ?? 0;
  const atk = pokemonData.stats.find((s) => s.name === "attack")?.value ?? 0;
  const def = pokemonData.stats.find((s) => s.name === "defense")?.value ?? 0;
  const spd = pokemonData.stats.find((s) => s.name === "speed")?.value ?? 0;

  return (
    <>
      <motion.div
        className="relative w-full max-w-[260px] mx-auto cursor-pointer select-none"
        whileHover={{ scale: 1.04, y: -6 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <div className={`rounded-2xl border-4 ${theme.border} bg-white shadow-xl p-1.5`}>

          <div className="rounded-xl overflow-hidden border border-black/10">

            <div className={`bg-gradient-to-r ${theme.header} px-3 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest bg-white/30 text-white px-1.5 py-0.5 rounded-sm border border-white/40">
                  BASIC
                </span>
                <h3 className="text-white font-extrabold text-base capitalize drop-shadow-sm leading-none">
                  {pokemonData.name}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/80 text-[10px] font-bold">HP</span>
                <span className="text-white font-black text-lg leading-none drop-shadow">{hp}</span>
              </div>
            </div>

            <div className={`relative bg-gradient-to-br ${theme.art} flex items-center justify-center`} style={{ height: 180 }}>
              <div className="absolute inset-2 rounded border border-black/8 pointer-events-none" />

              <motion.img
                src={pokemonData.imageUrl}
                alt={pokemonData.name}
                className="w-36 h-36 object-contain relative z-10"
                style={{ imageRendering: "pixelated" }}
                animate={isHovered ? { y: [-2, 3, -2] } : { y: 0 }}
                transition={
                  isHovered
                    ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
              />
            </div>

            <div className="bg-white px-3 py-1.5 flex items-center justify-between border-t border-black/8">
              <div className="flex gap-1">
                {pokemonData.type.map((t) => (
                  <span
                    key={t}
                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badge} ${theme.badgeText}`}
                  >
                    {typeTranslations[t.toLowerCase()] ?? t}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-bold text-gray-400">#{String(pokemonData.id).padStart(3, "0")}</span>
            </div>

            <div className="bg-gray-50 px-3 py-2.5 border-t border-black/8 space-y-1.5">
              {[
                { label: "Ataque",  value: atk },
                { label: "Defesa",  value: def },
                { label: "Veloc.",  value: spd },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-semibold w-14 flex-none">{label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.header}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 w-6 text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className={`bg-gradient-to-r ${theme.header} px-3 py-1.5 text-center`}>
              <p className="text-[9px] text-white/80 font-medium">Clique para ver detalhes</p>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none"
          initial={{ x: "-130%", opacity: 0 }}
          animate={isHovered ? { x: "130%", opacity: 1 } : { x: "-130%", opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />
      </motion.div>

      <PokemonDetailsModal
        pokemon={pokemonData}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
