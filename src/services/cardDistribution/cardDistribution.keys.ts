export const cardDistributionKeys = {
  all: ["player-cards"] as const,

  lists: () => [...cardDistributionKeys.all, "list"] as const,

  list: (filters?: string) =>
    [...cardDistributionKeys.lists(), filters] as const,

  details: () =>
    [...cardDistributionKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...cardDistributionKeys.details(), id] as const,
};