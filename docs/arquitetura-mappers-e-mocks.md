# Arquitetura: mappers e mocks locais

## PokéAPI e mapper

O `PokeApiService` agora tem apenas a responsabilidade de buscar dados externos. O método
`getPokemonDetails(id)` faz a chamada HTTP para a PokéAPI, valida `response.ok` e retorna o JSON
bruto no formato `RawPokeApiPokemon`.

A transformação desse JSON externo para o modelo interno da aplicação fica em
`src/mappers/pokemon.mapper.ts`. O `pokemonMapper` recebe `RawPokeApiPokemon` e retorna `Pokemon`,
mapeando `id`, `name`, `type`, `stats` e `imageUrl`.

O hook `usePlayerCards` é o ponto que combina as duas etapas: busca o JSON bruto pelo
`PokeApiService` e aplica o `pokemonMapper` antes de entregar os dados para a tela.

Essa separação evita que os componentes e hooks dependam diretamente do formato da PokéAPI. Se o
formato externo mudar, a adaptação fica concentrada no mapper.

## Mocks locais

Foram adicionados mocks simples para desenvolvimento e testes antes da integração com serviços
reais:

- `src/mocks/auth.mock.ts`: funções mockadas de login e cadastro.
- `src/mocks/player.mock.ts`: jogador mockado com id, nome, email e token fake.
- `src/mocks/cardDistribution.mock.ts`: lista local de IDs de Pokémon do jogador.
- `src/mocks/pokemon.mock.ts`: Pokémon já formatados no modelo interno `Pokemon`.

Também foi criado um serviço mock de jogadores em `src/services/player/`, com interface e
implementação assíncrona para `login`, `register` e `getProfile`.
