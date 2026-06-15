import Slider from "react-slick";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonCardSkeleton } from "@/components/PokemonCardSkeleton";
import { UserProfile } from "@/components/UserProfile";
import { usePlayerCards } from "@/hooks/usePlayerCards";
import { PokemonErrorCard } from "@/components/PokemonErrorCard";

import { pokeApiService } from "@/services/pokeApi";
import { cardDistributionMockService as cardDistributionService } from "@/mocks/cardDistribution.mock.service";
import { useAuth } from "@/contexts/auth";

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );
}

export default function Home() {
  const { user } = useAuth();

  const { distributionPending, distributionError, pokemons } = usePlayerCards({
    playerId: user?.id,
    cardDistributionService,
    pokeApiService,
  });

  const isLoadingCards = distributionPending || pokemons.some((query) => query.loading);
  const pageError = distributionError;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true } },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <motion.header
        className="px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm flex-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Visualização de Cartas</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Sua coleção de Pokémon — clique em uma carta para ver detalhes
            </p>
          </div>
          <UserProfile />
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          {isLoadingCards && (
            <div className="relative px-16">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
              </div>
            </div>
          )}

          {pageError && !isLoadingCards && (
            <div className="flex flex-col items-center justify-center gap-6">
              <PokemonErrorCard message={pageError.message} />
            </div>
          )}

          {pokemons.length === 0 && !isLoadingCards && !pageError && (
            <div className="flex flex-col items-center justify-center gap-6">
              <img src="/pokeball.gif" width={200} />
              <h2 className="text-3xl font-semibold text-red-600">Nenhum pokémon encontrado...</h2>
              <p className="text-center text-lg max-w-sm text-gray-600">
                Aguarde enquanto capturamos seus pokémons iniciais!
              </p>
            </div>
          )}

          {pokemons.length > 0 && !isLoadingCards && !pageError && (
            <div className="relative px-16">
              <Slider {...sliderSettings}>
                {pokemons.map(
                  ({ idCarta, idPokemon, ...pokemon }) =>
                    idPokemon !== null && (
                      <div key={idCarta ?? idPokemon} className="px-4 py-10">
                        <PokemonCard pokemon={pokemon} />
                      </div>
                    ),
                )}
              </Slider>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
