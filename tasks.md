## Tasks

### 🗺️ Mappers (arquitetura — feedback do professor)

- [X] **[alta]** Criar `pokemonMapper` e remover `formattedData` do `PokeApiService`
  - Em `PokeApiService.getPokemonDetails()`, a transformação do JSON da PokéAPI está inline no service (`formattedData`). Extrair essa lógica para um mapper dedicado `src/mappers/pokemon.mapper.ts` que recebe o JSON bruto e retorna o modelo `Pokemon`. O service passa a chamar o mapper no lugar da transformação direta.

- [ ] **[alta]** Criar `cardDistributionMapper` para tratar o JSON do Serviço de Distribuição de Cartas
  - Atualmente `CardDistributionService.getPlayerCards()` faz cast direto (`data as PlayerCards`) sem validar nem transformar o JSON recebido. Criar `src/mappers/cardDistribution.mapper.ts` que recebe o JSON bruto da API e retorna o modelo `PlayerCards` tipado. Isso desacopla o projeto do contrato do serviço externo.
  - Fluxo esperado: `cardDistributionMapper` trata o JSON de IDs → `PokeApiService` busca os detalhes de cada Pokémon → `pokemonMapper` transforma cada resposta da PokéAPI.

### 🧪 Mocks (criar antes da próxima aula)

- [X] **[alta]** Criar mock de autenticação (login)
  - `src/mocks/auth.mock.ts` com `mockLogin` e `mockRegister`. Usado por `AuthMockService` que implementa `IAuthService`.

- [X] **[alta]** Criar mock de cadastro
  - `mockRegister` em `src/mocks/auth.mock.ts` simula cadastro com resposta tipada `AuthResponse`.

- [X] **[alta]** Criar mock de pokemons
  - `src/mocks/pokemons.mock.ts` com lista de objetos `Pokemon` no formato pós-mapper.

### 🔐 Autenticação (novo)

- [X] **[alta]** Criar tela de login
  - `src/pages/login.tsx` com campos de e-mail e senha, validação, animações framer-motion, feedback de erro e botão com loading state.

- [X] **[alta]** Criar tela de cadastro
  - `src/pages/register.tsx` com campos de nome, e-mail, senha e confirmação, validação, animações e navegação de volta para o login.

- [X] **[alta]** Criar `IAuthService` + `AuthMockService`
  - `src/services/auth/auth.interface.ts` define contrato. `src/services/auth/auth.mock.service.ts` implementa usando os mocks.

- [X] **[alta]** Criar `AuthContext` e `AuthProvider`
  - `src/contexts/AuthContext.tsx` gerencia estado global de autenticação (user, token, isAuthenticated) com `login`, `register` e `logout`.

- [X] **[alta]** Conectar "Sair" ao logout real
  - `UserProfile.tsx` usa `useAuth().logout()` — ao clicar em Sair, a sessão é limpa e o app volta para a tela de login com animação.

### 🃏 Lógica e design de cartas

- [X] **[média]** Criar design de carta por elemento (Fire, Water, Grass, Electric, Psychic…)
  - `PokemonCard.tsx` e `PokemonDetailsModal.tsx` já aplicam gradientes e cores dinâmicas por tipo do Pokémon.

- [X] **[média]** Implementar modal de detalhes do Pokémon ao clicar na carta
  - `PokemonDetailsModal.tsx` criado com animações, stats com barras animadas, imagem flutuante e cores por tipo. Renderizado via `createPortal` para não conflitar com o carrossel.

- [X] **[média]** Melhorar o design visual das cartas e do carrossel
  - Cartas centralizadas verticalmente na tela com `flex-1 + justify-center`. Padding e espaçamento do slider ajustados. Cards com proporções melhoradas.

- [ ] **[média]** Exibir cartas filtradas pelo jogador logado
  - Atualmente o carrossel mostra todos os Pokémons. Após integração real, deve exibir apenas as cartas do jogador autenticado (usando `idJogador`).

- [ ] **[baixa]** Conectar `PlayerDetailsModal` ao perfil real do jogador
  - `PlayerDetailsModal.tsx` existe mas nunca é chamado em `App.tsx`. Deve ser aberto ao clicar no perfil e exibir dados reais vindos do Serviço de Jogadores.
