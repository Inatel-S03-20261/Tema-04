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

// Mock data - In production, this would come from API calls
const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "Charizard",
    type: ["Fire", "Flying"],
    hp: 266,
    attack: 223,
    defense: 173,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    playerId: 1,
    habitat: "Montanhas",
    height: 1.7,
    weight: 90.5,
    abilities: ["Chama", "Poder do Sol"],
    description: "Charizard voa pelos céus em busca de oponentes poderosos. Ele cospe fogo tão quente que pode derreter pedregulhos."
  },
  {
    id: 2,
    name: "Blastoise",
    type: ["Water"],
    hp: 268,
    attack: 171,
    defense: 207,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    playerId: 2,
    habitat: "Água Doce",
    height: 1.6,
    weight: 85.5,
    abilities: ["Torrente", "Chuva"],
    description: "Blastoise tem canhões de água que se projetam de sua concha. Os jatos de água são tão precisos que podem atingir latas vazias a 50 metros."
  },
  {
    id: 3,
    name: "Venusaur",
    type: ["Grass", "Poison"],
    hp: 270,
    attack: 181,
    defense: 198,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    playerId: 1,
    habitat: "Planícies",
    height: 2.0,
    weight: 100.0,
    abilities: ["Crescimento", "Clorofila"],
    description: "A flor nas costas de Venusaur libera um aroma calmante. O aroma acalma as emoções das pessoas."
  },
  {
    id: 4,
    name: "Pikachu",
    type: ["Electric"],
    hp: 185,
    attack: 165,
    defense: 130,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    playerId: 3,
    habitat: "Florestas",
    height: 0.4,
    weight: 6.0,
    abilities: ["Estática", "Para-raios"],
    description: "Pikachu pode gerar poderosas cargas elétricas. Suas bochechas brilham quando está carregado de eletricidade."
  },
  {
    id: 5,
    name: "Mewtwo",
    type: ["Psychic"],
    hp: 322,
    attack: 300,
    defense: 182,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    playerId: 2,
    habitat: "Raro",
    height: 2.0,
    weight: 122.0,
    abilities: ["Pressão", "Nervosismo"],
    description: "Mewtwo é um Pokémon criado por manipulação genética. Seus poderes psíquicos são incomparáveis e pode controlar a mente dos outros."
  },
];

const mockPlayers: Record<number, Player> = {
  1: {
    id: 1,
    name: "Ash Ketchum",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    level: 42,
    wins: 156,
    totalBattles: 230,
    badges: 8,
    favoriteType: "Fogo",
    joinDate: "Jan 2020",
  },
  2: {
    id: 2,
    name: "Misty Waters",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    level: 38,
    wins: 134,
    totalBattles: 198,
    badges: 7,
    favoriteType: "Água",
    joinDate: "Mar 2020",
  },
  3: {
    id: 3,
    name: "Brock Stone",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    level: 40,
    wins: 145,
    totalBattles: 215,
    badges: 6,
    favoriteType: "Elétrico",
    joinDate: "Fev 2020",
  },
};

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

  const handleCardClick = (pokemonId: number) => {
    const pokemon = mockPokemons.find(p => p.id === pokemonId);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <motion.header
        className="px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-gray-900">Visualizador de Cartas Pokémon</h1>
            <p className="text-sm text-gray-600 mt-1">Explore a coleção e veja detalhes completos de cada Pokémon</p>
          </div>
          <UserProfile user={currentUser} />
        </div>
      </motion.header>

      {/* Main content */}
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

          {/* Carousel */}
          <div className="relative px-12">
            <Slider {...sliderSettings}>
              {mockPokemons.map((pokemon) => (
                <div key={pokemon.id} className="px-4 py-8">
                  <PokemonCard pokemon={pokemon} onCardClick={handleCardClick} />
                </div>
              ))}
            </Slider>
          </div>

          {/* Info section */}
          {/* <motion.div
            className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-gray-900 mb-3">Sobre Esta Coleção</h3>
            <p className="text-gray-600 leading-relaxed">
              Esta aplicação exibe cartas Pokémon de vários jogadores. Cada carta mostra as
              estatísticas do Pokémon incluindo HP, Ataque e Defesa. Clique em qualquer carta para
              ver informações detalhadas sobre o Pokémon, incluindo habitat, habilidades, altura,
              peso e uma descrição completa.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-gray-900 mb-1">{mockPokemons.length}</div>
                <div className="text-sm text-gray-600">Total de Cartas</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-1">{Object.keys(mockPlayers).length}</div>
                <div className="text-sm text-gray-600">Jogadores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-1">
                  {new Set(mockPokemons.map((p) => p.type).flat()).size}
                </div>
                <div className="text-sm text-gray-600">Tipos de Cartas</div>
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </main>

      {/* Pokemon Details Modal */}
      {selectedPokemon && (
        <PokemonDetailsModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}