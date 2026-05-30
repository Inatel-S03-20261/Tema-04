## Tasks

### 🗺️ Mappers (arquitetura — feedback do professor)

- [X] **[alta]** Criar `pokemonMapper` e remover `formattedData` do `PokeApiService`
  - Em `PokeApiService.getPokemonDetails()`, a transformação do JSON da PokéAPI está inline no service (`formattedData`). Extrair essa lógica para um mapper dedicado `src/mappers/pokemon.mapper.ts` que recebe o JSON bruto e retorna o modelo `Pokemon`. O service passa a chamar o mapper no lugar da transformação direta.

- [ ] **[alta]** Criar `cardDistributionMapper` para tratar o JSON do Serviço de Distribuição de Cartas
  - Atualmente `CardDistributionService.getPlayerCards()` faz cast direto (`data as PlayerCards`) sem validar nem transformar o JSON recebido. Criar `src/mappers/cardDistribution.mapper.ts` que recebe o JSON bruto da API e retorna o modelo `PlayerCards` tipado. Isso desacopla o projeto do contrato do serviço externo.
  - Fluxo esperado: `cardDistributionMapper` trata o JSON de IDs → `PokeApiService` busca os detalhes de cada Pokémon → `pokemonMapper` transforma cada resposta da PokéAPI.

### 🧪 Mocks (criar antes da próxima aula)

- [ ] **[alta]** Criar mock de autenticação (login)
  - Criar `src/mocks/login.mock.ts` com dados simulados de requisição e resposta do endpoint de login (ex.: `{ token: "...", jogadorId: "..." }`). Usar nos testes e no desenvolvimento enquanto o `JogadorService` real não estiver integrado.

- [ ] **[alta]** Criar mock de cadastro
  - Criar `src/mocks/cadastro.mock.ts` com dados simulados de requisição e resposta do endpoint de cadastro (ex.: payload com nome, email, senha e resposta de sucesso/erro). Usar para desenvolver a `TelaCadastro` sem depender do backend.

- [X] **[alta]** Criar mock de pokemons
  - Criar `src/mocks/pokemons.mock.ts` com uma lista de objetos `Pokemon` (já no formato do schema, pós-mapper) para uso em desenvolvimento e testes. Substituir qualquer `mockPokemons` espalhado na codebase por essa fonte centralizada.


### 🃏 Lógica e design de cartas

- [X] **[média]** Criar design de carta por elemento (Fire, Water, Grass, Electric, Psychic…)
  - `PokemonCard.tsx` e `PokemonDetailsModal.tsx` já aplicam gradientes e cores dinâmicas por tipo do Pokémon.

- [X] **[média]** Implementar modal de detalhes do Pokémon ao clicar na carta
  - `PokemonDetailsModal.tsx` criado com animações, stats com barras animadas, imagem flutuante e cores por tipo. Renderizado via `createPortal` para não conflitar com o carrossel.

- [ ] **[média]** Melhorar o design visual das cartas e do carrossel
  - As cartas e o carrossel estão funcionais mas podem ser mais polidos: tamanho das imagens dos Pokémons, proporções do card, espaçamento entre cartas, animações de transição do slider, responsividade, e qualquer outro ajuste visual que melhore a apresentação geral.

- [ ] **[média]** Exibir cartas filtradas pelo jogador logado
  - Atualmente o carrossel mostra todos os Pokémons. Após integração real, deve exibir apenas as cartas do jogador autenticado (usando `idJogador`).

- [ ] **[baixa]** Conectar `PlayerDetailsModal` ao perfil real do jogador
  - `PlayerDetailsModal.tsx` existe mas nunca é chamado em `App.tsx`. Deve ser aberto ao clicar no perfil e exibir dados reais vindos do Serviço de Jogadores.
