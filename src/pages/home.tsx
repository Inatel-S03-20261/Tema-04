import Slider from "react-slick";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonCardSkeleton } from "@/components/PokemonCardSkeleton";
import { UserProfile } from "@/components/UserProfile";
import { usePlayerCards } from "@/hooks/usePlayerCards";
import { PokemonErrorCard } from "@/components/PokemonErrorCard";

import { pokeApiService } from "@/services/pokeApi";
import { playerMockService } from "@/services/player";
import { cardDistributionMockService as cardDistributionService } from "@/mocks/cardDistribution.mock.service";

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
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
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );
}

export default function Home() {
  const {
    data: authSession,
    isPending: authPending,
    error: authError,
  } = useQuery({
    queryKey: ["mock-auth-session"],
    queryFn: () => playerMockService.login("grupo3@inatel.br", "123456"),
    retry: false,
  });

  const token = authSession?.token ?? "";
  const currentUser = {
    name: authSession?.user.name ?? "Carregando...",
    avatar: "https://cdn-icons-png.flaticon.com/256/1169/1169608.png",
  };

  const { distributionPending, distributionError, pokemons } = usePlayerCards(token, {
    cardDistributionService,
    pokeApiService,
  });

  const isLoadingCards =
    authPending || distributionPending || pokemons.some((query) => query.loading);
  const pageError = authError ?? distributionError;

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
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <motion.header
        className="px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-gray-900">Visualização de Cartas</h1>
            <p className="text-sm text-gray-600 mt-1">
              Veja as cartas que você possui e clique para detalhes completos
            </p>
          </div>
          <UserProfile user={currentUser} />
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          {isLoadingCards && (
            <div className="relative px-12">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
              </div>
            </div>
          )}

          {pageError && (
            <div className="h-full -mt-8 flex flex-col items-center justify-center gap-6">
              <PokemonErrorCard message={pageError.message} />
            </div>
          )}

          {pokemons.length === 0 && !isLoadingCards && !pageError && (
            <div className="h-full -mt-8 flex flex-col items-center justify-center gap-6">
              <img src="/pokeball.gif" width={200} />
              <h2 className="text-3xl font-semibold text-red-600">Nenhum pokémon encontrado...</h2>
              <p className="text-center text-lg max-w-sm">
                Aguarde enquanto capturamos seus pokémons iniciais!
              </p>
            </div>
          )}

          {pokemons.length > 0 && !isLoadingCards && !pageError && (
            <div className="relative px-12">
              <Slider {...sliderSettings}>
                {pokemons.map(
                  ({ idCarta, idPokemon, id, ...pokemon }) =>
                    idPokemon !== null && (
                      <div key={idCarta ?? id ?? idPokemon} className="px-4 py-8">
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
