import { createContext, useContext, type ReactNode } from "react";
import type { ICardDistributionService } from "@/services/cardDistribution";
import type { IPokeApiService } from "@/services/pokeApi";

interface ServiceStrategy {
  cardDistributionService: ICardDistributionService;
  pokeApiService: IPokeApiService;
}

const ServiceStrategyContext = createContext<ServiceStrategy | null>(null);

interface ServiceStrategyProviderProps {
  children: ReactNode;
  strategy: ServiceStrategy;
}

export function ServiceStrategyProvider({ children, strategy }: ServiceStrategyProviderProps) {
  return (
    <ServiceStrategyContext.Provider value={strategy}>
      {children}
    </ServiceStrategyContext.Provider>
  );
}

export function useServiceStrategy(): ServiceStrategy {
  const ctx = useContext(ServiceStrategyContext);
  if (!ctx) throw new Error("useServiceStrategy must be used inside <ServiceStrategyProvider>");
  return ctx;
}