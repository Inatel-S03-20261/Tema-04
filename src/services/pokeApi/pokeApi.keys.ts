export const pokeApiKeys = {
  all: ["pokemon"] as const,

  lists: () => [...pokeApiKeys.all, "list"] as const,

  list: (filters?: string) =>
    [...pokeApiKeys.lists(), filters] as const,

  details: () =>
    [...pokeApiKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...pokeApiKeys.details(), id] as const,
};