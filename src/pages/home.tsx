import { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonDetailsModal } from "@/components/PokemonDetailsModal";
import { PokemonErrorCard } from "@/components/PokemonErrorCard";
import { UserProfile } from "@/components/UserProfile";

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

const currentUser = {
  name: "Grupo 3",
  avatar: "https://cdn-icons-png.flaticon.com/256/1169/1169608.png",
};

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
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const idJogador = 1;

    fetch(`http://localhost:3001/cartas/${idJogador}`)
      .then((res) => {
        if (!res.ok) throw new Error("Nenhuma carta encontrada");
        return res.json();
      })
      .then((data) => {
        const cartasMapeadas: Pokemon[] = data.cartas.map((c: any) => ({
          id: c.id,
          name: c.name,
          type: c.type,
          hp: c.hp,
          attack: c.attack,
          defense: c.defense,
          imageUrl: c.imageUrl,
          playerId: idJogador,
        }));
        setPokemons(cartasMapeadas);
        setFetchError(null);
      })
      .catch(() => {
        setPokemons([]);
        setFetchError("Não foi possível carregar as cartas do jogador.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (pokemonId: number) => {
    const pokemon = pokemons.find((p) => p.id === pokemonId);
    if (pokemon) setSelectedPokemon(pokemon);
  };

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
          {loading && <p className="text-center text-gray-500">Carregando cartas...</p>}

          {fetchError && !loading && (
            <div className="h-full -mt-8 flex flex-col items-center justify-center gap-6">
              <PokemonErrorCard message={fetchError} />
            </div>
          )}

          {pokemons.length === 0 && !loading && !fetchError && (
            <div className="h-full -mt-8 flex flex-col items-center justify-center gap-6">
              <img src="/pokeball.gif" width={200}/>
              <h2 className="text-3xl font-semibold text-red-600">Nenhum pokémon encontrado...</h2>
              <p className="text-center text-lg max-w-sm">Aguarde enquanto capturamos seus pokémons iniciais!</p>
            </div>
          )}

          {!loading && pokemons.length > 0 && (
            <div className="relative px-12">
              <Slider {...sliderSettings}>
                {pokemons.map((pokemon) => (
                  <div key={pokemon.id} className="px-4 py-8">
                    <PokemonCard pokemon={pokemon} onCardClick={handleCardClick} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </motion.div>
      </main>

      {selectedPokemon && (
        <PokemonDetailsModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}
