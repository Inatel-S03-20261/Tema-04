# Arquitetura: mappers e mocks locais

## PokéAPI e mapper

O `PokeApiService` agora tem apenas a responsabilidade de buscar dados externos. O método
`getPokemonDetails(id)` faz a chamada HTTP para a PokéAPI, valida `response.ok` e retorna o JSON
bruto no formato `RawPokeApiPokemon`.

A transformação desse JSON externo para o modelo interno da aplicação fica em
`src/mappers/pokemon.mapper.ts`. O `pokemonMapper` recebe `RawPokeApiPokemon` e retorna `Pokemon`,
mapeando `id`, `name`, `type`, `stats` e `imageUrl`.

O tipo `RawPokeApiPokemon` fica em `src/schemas/rawPokeApiPokemon.ts`, separado do mapper e do
service. Assim, o service não depende da camada de transformação.

O hook `usePlayerCards` é o ponto que combina as duas etapas: busca o JSON bruto pelo
`PokeApiService` e aplica o `pokemonMapper` antes de entregar os dados para a tela.

Essa separação evita que os componentes e hooks dependam diretamente do formato da PokéAPI. Se o
formato externo mudar, a adaptação fica concentrada no mapper.

## Mocks locais

O fluxo principal usa mocks apenas para os serviços que ainda não existem localmente:

- `src/mocks/auth.mock.ts`: simula login e cadastro, retornando `token` e `user`.
- `src/mocks/cardDistribution.mock.ts`: simula a posse das cartas, retornando `idCarta` e
  `idPokemon`.

Depois que o mock de autenticação retorna o token, a Home chama o mock de distribuição de cartas.
Com os `idPokemon` recebidos, a aplicação busca os dados reais na PokéAPI por meio do
`PokeApiService`, aplica o `pokemonMapper` e renderiza o modelo interno `Pokemon`.

Não existe mock de Pokémon no fluxo principal. Os dados reais do Pokémon vêm da PokéAPI: o
`PokeApiService` busca o JSON bruto e o `pokemonMapper` transforma esse JSON no modelo interno
`Pokemon` usado pela tela.

Também foi criado um serviço mock de jogadores em `src/services/player/`, com interface e
implementação assíncrona para `login`, `register` e `getProfile`.

Os contratos JSON esperados para integração com as outras equipes estão documentados no
`README.md`, na seção "Integração com Serviços Externos".
