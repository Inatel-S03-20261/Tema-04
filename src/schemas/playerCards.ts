export interface DistributedCard {
  idCarta: string;
  idPokemon: string;
}

export interface PlayerCards {
  cards: DistributedCard[];
}
