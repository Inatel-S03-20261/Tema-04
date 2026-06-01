import type { Pokemon } from "@/schemas/pokemon";

export const pokemonMock: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    type: ["grass", "poison"],
    stats: [
      { name: "hp", value: 45, effort: 0 },
      { name: "attack", value: 49, effort: 0 },
      { name: "defense", value: 49, effort: 0 },
      { name: "special-attack", value: 65, effort: 1 },
      { name: "special-defense", value: 65, effort: 0 },
      { name: "speed", value: 45, effort: 0 },
    ],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 4,
    name: "charmander",
    type: ["fire"],
    stats: [
      { name: "hp", value: 39, effort: 0 },
      { name: "attack", value: 52, effort: 0 },
      { name: "defense", value: 43, effort: 0 },
      { name: "special-attack", value: 60, effort: 0 },
      { name: "special-defense", value: 50, effort: 0 },
      { name: "speed", value: 65, effort: 1 },
    ],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 7,
    name: "squirtle",
    type: ["water"],
    stats: [
      { name: "hp", value: 44, effort: 0 },
      { name: "attack", value: 48, effort: 0 },
      { name: "defense", value: 65, effort: 1 },
      { name: "special-attack", value: 50, effort: 0 },
      { name: "special-defense", value: 64, effort: 0 },
      { name: "speed", value: 43, effort: 0 },
    ],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  {
    id: 25,
    name: "pikachu",
    type: ["electric"],
    stats: [
      { name: "hp", value: 35, effort: 0 },
      { name: "attack", value: 55, effort: 0 },
      { name: "defense", value: 40, effort: 0 },
      { name: "special-attack", value: 50, effort: 0 },
      { name: "special-defense", value: 50, effort: 0 },
      { name: "speed", value: 90, effort: 2 },
    ],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    id: 39,
    name: "jigglypuff",
    type: ["normal", "fairy"],
    stats: [
      { name: "hp", value: 115, effort: 2 },
      { name: "attack", value: 45, effort: 0 },
      { name: "defense", value: 20, effort: 0 },
      { name: "special-attack", value: 45, effort: 0 },
      { name: "special-defense", value: 25, effort: 0 },
      { name: "speed", value: 20, effort: 0 },
    ],
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
  },
];

export const pokemonsMock = pokemonMock;
