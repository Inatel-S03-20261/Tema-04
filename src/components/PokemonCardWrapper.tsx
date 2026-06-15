import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { PokemonErrorCard } from "./PokemonErrorCard";
import type { Pokemon } from "@/schemas/pokemon";
import { PokemonCardSkeleton } from "./PokemonCardSkeleton";
import { PokemonDetailsModal } from "./PokemonDetailsModal";
import { PokemonCard } from "./PokemonCard";

interface PokemonCardProps {
  pokemon: {
    data?: Pokemon;
    error: Error | null;
    loading: boolean;
  };
}

const statsToSearch = ["hp", "attack", "defense", "speed"] as const;
type StatName = (typeof statsToSearch)[number];

export function PokemonCardWrapper({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const pokemonData = pokemon.data;

  const pokemonStats = useMemo(() => {
    const statsMap: Partial<Record<StatName, number>> = {};

    pokemonData?.stats.forEach((stat) => {
      if (statsToSearch.includes(stat.name as StatName)) {
        statsMap[stat.name as StatName] = stat.value;
      }
    });

    return statsMap;
  }, [pokemonData?.stats]);

  if (pokemon.error) return <PokemonErrorCard message={pokemon.error.message} />;
  if (pokemon.loading || !pokemonData) return <PokemonCardSkeleton />;

  return (
    <>
      <PokemonCard.Root
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
        pokemonType={pokemonData.type[0]}
      >
        <PokemonCard.Content>
          <PokemonCard.Header id={pokemonData.id} name={pokemonData.name} hp={pokemonStats.hp} />

          <PokemonCard.Art>
            <motion.img
              src={pokemonData.imageUrl}
              alt={pokemonData.name}
              className="w-36 h-36 object-contain relative z-10"
              style={{ imageRendering: "pixelated" }}
              animate={isHovered ? { y: [-2, 3, -2] } : { y: 0 }}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            />
          </PokemonCard.Art>

          <PokemonCard.TypeList types={pokemonData.type} />

          <PokemonCard.Stats
            atk={pokemonStats.attack}
            def={pokemonStats.defense}
            spd={pokemonStats.speed}
          />

          <PokemonCard.Footer>
            <p className="text-[9px] text-white/80 font-medium">Clique para ver detalhes</p>
          </PokemonCard.Footer>
        </PokemonCard.Content>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none"
          initial={{ x: "-130%", opacity: 0 }}
          animate={isHovered ? { x: "130%", opacity: 1 } : { x: "-130%", opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />
      </PokemonCard.Root>

      <PokemonDetailsModal
        pokemon={pokemonData}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
