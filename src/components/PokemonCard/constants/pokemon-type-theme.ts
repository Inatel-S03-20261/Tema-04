export type PokemonTheme = {
  border: string;
  header: string;
  art: string;
  badge: string;
  badgeText: string;
};

export const typeTheme: Record<string, PokemonTheme> = {
  fire: {
    border: "border-orange-400",
    header: "from-orange-300 to-red-400",
    art: "from-orange-100 via-amber-50 to-yellow-100",
    badge: "bg-orange-500",
    badgeText: "text-white",
  },
  water: {
    border: "border-blue-400",
    header: "from-sky-300 to-blue-500",
    art: "from-sky-100 via-blue-50 to-cyan-100",
    badge: "bg-blue-500",
    badgeText: "text-white",
  },
  grass: {
    border: "border-green-400",
    header: "from-lime-300 to-green-500",
    art: "from-lime-100 via-green-50 to-emerald-100",
    badge: "bg-green-500",
    badgeText: "text-white",
  },
  electric: {
    border: "border-yellow-400",
    header: "from-yellow-200 to-amber-400",
    art: "from-yellow-50 via-amber-50 to-yellow-100",
    badge: "bg-yellow-400",
    badgeText: "text-yellow-900",
  },
  psychic: {
    border: "border-fuchsia-400",
    header: "from-fuchsia-300 to-purple-500",
    art: "from-fuchsia-50 via-pink-50 to-purple-100",
    badge: "bg-fuchsia-500",
    badgeText: "text-white",
  },
  fighting: {
    border: "border-red-500",
    header: "from-red-400 to-orange-600",
    art: "from-red-50 via-orange-50 to-amber-100",
    badge: "bg-red-600",
    badgeText: "text-white",
  },
  poison: {
    border: "border-purple-500",
    header: "from-purple-400 to-violet-600",
    art: "from-purple-50 via-violet-50 to-indigo-100",
    badge: "bg-purple-600",
    badgeText: "text-white",
  },
  flying: {
    border: "border-sky-300",
    header: "from-sky-200 to-indigo-400",
    art: "from-sky-50 via-cyan-50 to-blue-100",
    badge: "bg-sky-400",
    badgeText: "text-white",
  },
  rock: {
    border: "border-stone-400",
    header: "from-stone-300 to-stone-500",
    art: "from-stone-50 via-gray-50 to-stone-100",
    badge: "bg-stone-500",
    badgeText: "text-white",
  },
  ground: {
    border: "border-amber-500",
    header: "from-amber-300 to-yellow-600",
    art: "from-amber-50 via-yellow-50 to-orange-100",
    badge: "bg-amber-600",
    badgeText: "text-white",
  },
  ice: {
    border: "border-cyan-300",
    header: "from-cyan-200 to-blue-400",
    art: "from-cyan-50 via-blue-50 to-sky-100",
    badge: "bg-cyan-400",
    badgeText: "text-white",
  },
  bug: {
    border: "border-lime-500",
    header: "from-lime-300 to-green-600",
    art: "from-lime-50 via-green-50 to-emerald-100",
    badge: "bg-lime-600",
    badgeText: "text-white",
  },
  ghost: {
    border: "border-indigo-500",
    header: "from-indigo-400 to-violet-700",
    art: "from-indigo-50 via-purple-50 to-violet-100",
    badge: "bg-indigo-700",
    badgeText: "text-white",
  },
  dragon: {
    border: "border-blue-700",
    header: "from-blue-500 to-indigo-700",
    art: "from-blue-50 via-indigo-50 to-violet-100",
    badge: "bg-blue-700",
    badgeText: "text-white",
  },
  dark: {
    border: "border-neutral-600",
    header: "from-neutral-500 to-neutral-800",
    art: "from-neutral-100 via-gray-50 to-stone-100",
    badge: "bg-neutral-800",
    badgeText: "text-white",
  },
  steel: {
    border: "border-slate-400",
    header: "from-slate-300 to-slate-500",
    art: "from-slate-50 via-gray-50 to-slate-100",
    badge: "bg-slate-500",
    badgeText: "text-white",
  },
  fairy: {
    border: "border-pink-300",
    header: "from-pink-200 to-rose-400",
    art: "from-pink-50 via-rose-50 to-fuchsia-100",
    badge: "bg-pink-400",
    badgeText: "text-white",
  },
  normal: {
    border: "border-gray-400",
    header: "from-gray-200 to-gray-400",
    art: "from-gray-50 via-slate-50 to-gray-100",
    badge: "bg-gray-400",
    badgeText: "text-white",
  },
};
