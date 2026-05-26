export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  stats: {
    value: number;
    name: string;
    effort: number;
  }[];
  imageUrl: string;
}
