## Tasks

### 🔗 Integração com APIs (backend)

- [ ] **[alta]** Substituir `mockPokemons` por GET real no Serviço de Distribuição de Cartas
  - Endpoint: recebe o nome do Pokémon via Postman → busca na PokéAPI → retorna os dados. Atualmente tudo está hardcoded em `App.tsx`.

- [ ] **[alta]** Implementar `PokemonService.obterDetalhes(idPokemon)`
  - Classe prevista no diagrama de classes. Faz o fetch na PokéAPI (`pokeapi.co/api/v2/pokemon/{id}`) e mapeia para o modelo `Pokemon`.

- [ ] **[alta]** Implementar `DistribuicaoCartasService.consultarCartas(token)`
  - Classe prevista no diagrama de classes. Recebe o token do jogador e retorna a lista de cartas atribuídas. Atualmente `mockPokemons` faz esse papel.

- [ ] **[alta]** Substituir `mockPlayers` por GET real no Serviço de Jogadores
  - `JogadorService.validarToken()` / dados do jogador logado. Atualmente `mockPlayers` e `currentUser` são estáticos.

### 🔐 Autenticação

- [ ] **[alta]** Criar `TelaLogin` com `JogadorService.autenticar()` e `guardarToken()`
  - Caso de uso UC1 do diagrama. Componente, formulário e chamada ao Serviço de Jogadores ainda não existem na codebase.

- [ ] **[média]** Criar `TelaCadastro` com `JogadorService.realizarCadastro()`
  - Caso de uso UC2 do diagrama. Componente previsto no diagrama de classes mas ausente no projeto.

- [ ] **[média]** Implementar guarda de rota / redirecionamento após login
  - `TelaLogin.redirecionarAposLogin()` está no diagrama. Nenhum roteamento existe ainda (o projeto não tem `react-router`).

- [ ] **[média]** Implementar `JogadorService.validarToken()` e persistência de sessão
  - Sem isso não é possível proteger rotas nem manter o usuário logado ao recarregar a página.

### 🃏 Lógica e design de cartas

- [ ] **[média]** Criar design de carta por elemento (Fire, Water, Grass, Electric, Psychic…)
  - Hoje `PokemonCard.tsx` usa um gradiente fixo. O card deve mudar cor, ícone e estilo de acordo com o tipo do Pokémon retornado pela PokéAPI.

- [ ] **[média]** Exibir cartas filtradas pelo jogador logado
  - Atualmente o carrossel mostra todos os Pokémons. Após integração real, deve exibir apenas as cartas do jogador autenticado (usando `idJogador`).

- [ ] **[baixa]** Conectar `PlayerDetailsModal` ao perfil real do jogador
  - `PlayerDetailsModal.tsx` existe mas nunca é chamado em `App.tsx`. Deve ser aberto ao clicar no perfil e exibir dados reais vindos do Serviço de Jogadores.

### ⚙️ Infraestrutura e qualidade

- [ ] **[média]** Adicionar `react-router` (ou similar) para navegação entre telas
  - Sem ele não é possível ter rotas separadas de Login, Cadastro e Visualização de Cartas como mostrado no diagrama de casos de uso.

- [ ] **[baixa]** Tratar estados de loading e erro nas chamadas de API
  - Hoje não há skeleton, spinner nem mensagem de erro. Necessário ao integrar com serviços reais que podem falhar ou demorar.

- [ ] **[baixa]** Configurar variáveis de ambiente (URLs dos serviços, chaves de API)
  - Criar `.env` com `VITE_PLAYERS_API_URL`, `VITE_CARDS_API_URL` etc. para não ter URLs hardcoded no código.