import { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetailsModal } from "./components/PokemonDetailsModal";
import { UserProfile } from "./components/UserProfile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  level: 45,
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

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

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
      })
      .catch((err) => setErro(err.message))
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <motion.header
        className="px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-gray-900">Visualizador de Cartas Pokémon</h1>
            <p className="text-sm text-gray-600 mt-1">
              Explore a coleção e veja detalhes completos de cada Pokémon
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
        >
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-2">Coleção de Cartas Pokémon</h2>
            <p className="text-gray-600">
              Clique em qualquer carta para ver detalhes completos do Pokémon
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Carregando cartas...</p>
          )}
          {erro && (
            <p className="text-center text-red-500">
              {erro} — envie um POST para /cartas primeiro
            </p>
          )}
          {!loading && !erro && (
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
        <PokemonDetailsModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}