# 🃏 Visualização de Cartas — Pokémon Card Viewer

Aplicação responsável por exibir as cartas Pokémon de cada jogador. Consulta os serviços de **distribuição de cartas** e de **jogadores** para recuperar as informações necessárias, além de integrar com a **PokéAPI** para obter os dados completos de cada Pokémon.

> Projeto desenvolvido como parte de um sistema distribuído de gerenciamento de cartas Pokémon.

---

## 📋 Índice

- [Sobre a Aplicação](#sobre-a-aplicação)
- [Funcionalidades](#funcionalidades)
- [Diagramas](#diagramas)
  - [Diagrama de Caso de Uso](#diagrama-de-caso-de-uso)
  - [Diagrama de Classes](#diagrama-de-classes)
- [Tecnologias](#tecnologias)
- [Como Executar](#como-executar)
- [Integração com Serviços Externos](#integração-com-serviços-externos)

---

## Sobre a Aplicação

Esta aplicação é o frontend do módulo de Visualização de Cartas do sistema. Principais responsabilidades:

- Consultar o Serviço de Jogadores para autenticação e dados do jogador logado
- Consultar o Serviço de Distribuição de Cartas para recuperar as cartas atribuídas a cada jogador
- Enriquecer as cartas com dados da PokéAPI (tipos, estatísticas, imagens, habilidades)
- Renderizar as cartas de forma responsiva e interativa no navegador

Estado atual: a interface e os componentes principais estão implementados com dados mockados. A integração completa com serviços reais pode ser habilitada substituindo os mocks pelas chamadas HTTP correspondentes.

---

## Funcionalidades

- Visualização das cartas por jogador com navegação e seleção
- Modal ou painel de detalhes com informações enriquecidas do Pokémon
- Componentes de estado: skeletons de carregamento e tratamento de erro (cards de erro)
- Perfil do usuário exibido no header (nome, opções básicas)
- Integração com serviços externos (stub local + estrutura para PokéAPI)
- Layout responsivo e animações leves para melhor experiência

---

## Diagramas

### Diagrama de Caso de Uso

![Diagrama de Caso de Uso](docs/diagrama-casos-de-uso-v2.jpg)

### Diagrama de Classes

![Diagrama de Classes](docs/diagrama-classes-v3.jpg)

[Versão dos diagramas no miro](https://miro.com/welcomeonboard/Mlc0NDJwdDlRTXRKUFdyUUt4KzdZZ1J0NllXN1M0YldsbVBVcVNzY3Y2RkIzN2dnUjFzalVaeEplUTRWTnAvRmd5SXhVUHZ6WkVYQ1pWRXBXbmpiT3hEUDRVUEFuNVU3aGtkNGNUOVB1VFc1VUFXV1F5QXJzcU0rSWVxVDd3VDVnbHpza3F6REdEcmNpNEFOMmJXWXBBPT0hdjE=?share_link_id=404047321847).

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.3.1 | Biblioteca principal de UI |
| [TypeScript](https://www.typescriptlang.org/) | — | Tipagem estática |
| [Vite](https://vitejs.dev/) | 6.3.5 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.12 | Estilização utilitária |
| [Motion (Framer Motion)](https://motion.dev/) | 12.23.24 | Animações e transições |
| [React Slick](https://react-slick.neostack.com/) | 0.31.0 | Carrossel de cartas |

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositório>
cd cardViewing

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build para produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

---

## Integração com Serviços Externos

A aplicação integra com três serviços principais:

1. Serviço de Jogadores
  - Responsabilidade: autenticação, perfil e dados do jogador.
  - Uso: retorna token JWT (Bearer) utilizado nas chamadas ao Serviço de Distribuição de Cartas.

2. Serviço de Distribuição de Cartas
  - Responsabilidade: fornecer as cartas atribuídas a um jogador.
  - Retorno esperado: objeto contendo `cards`, uma lista de cartas com pelo menos `idCarta` e `idPokemon`.

3. PokéAPI
  - Responsabilidade: dados públicos e enriquecidos de cada Pokémon.
  - Endpoint: `https://pokeapi.co/api/v2/pokemon/{id}` (documentação em https://pokeapi.co/).

Configuração e boas práticas

- Variáveis de ambiente (Vite): defina os endpoints usando o prefixo `VITE_`, por exemplo:

  - `VITE_PLAYERS_API_URL` — URL base do Serviço de Jogadores
  - `VITE_CARD_DISTRIBUTION_URL` — URL base do Serviço de Distribuição de Cartas

### Contratos JSON esperados

Esta seção documenta os formatos de JSON esperados das outras equipes para a integração com a
Aplicação 4. O fluxo atual é:

`login/auth mock -> token -> cardDistribution mock -> idPokemon -> PokéAPI real -> pokemonMapper -> tela`

Os mocks existem apenas para simular serviços ainda não integrados. Não existe mock de Pokémon no
fluxo principal; os dados reais dos Pokémon vêm da PokéAPI.

#### Serviço de Jogadores / Autenticação

Esperamos que login ou cadastro retornem um token de acesso e os dados básicos do usuário.

Formato esperado:

```json
{
  "token": "jwt-ou-token-de-acesso",
  "user": {
    "id": "player-001",
    "name": "Grupo 3",
    "email": "grupo3@inatel.br",
    "role": "PLAYER"
  }
}
```

Campos esperados:

- `token`: string obrigatória. Será usado nas próximas chamadas.
- `user.id`: string obrigatória.
- `user.name`: string obrigatória.
- `user.email`: string obrigatória.
- `user.role`: string opcional/recomendada. Exemplo: `"PLAYER"`.

Se a equipe de autenticação retornar outro nome de campo, como `accessToken` em vez de `token`, a
Aplicação 4 precisará adaptar o service/mapper de autenticação.

#### Serviço de Distribuição de Cartas

A Aplicação 4 espera que a equipe de Distribuição de Cartas envie apenas a relação das cartas que
pertencem ao jogador autenticado. A Aplicação 4 não espera receber dados completos do Pokémon nesse
JSON.

A Distribuição deve enviar apenas:

- o identificador da carta distribuída;
- o identificador do Pokémon vinculado a essa carta.

Formato principal esperado:

```json
{
  "cards": [
    {
      "idCarta": "card-001",
      "idPokemon": "1"
    },
    {
      "idCarta": "card-002",
      "idPokemon": "4"
    },
    {
      "idCarta": "card-003",
      "idPokemon": "7"
    },
    {
      "idCarta": "card-004",
      "idPokemon": "25"
    },
    {
      "idCarta": "card-005",
      "idPokemon": "39"
    }
  ]
}
```

Campos esperados:

- `cards`: array obrigatório.
- `cards[].idCarta`: string obrigatória. Identifica a carta distribuída para o jogador.
- `cards[].idPokemon`: string obrigatória. Identifica qual Pokémon aquela carta representa.

Regras esperadas da Distribuição:

- O endpoint deve retornar apenas as cartas do jogador autenticado.
- A chamada deve usar o token recebido no login/autenticação.
- Cada item do array representa uma carta distribuída.
- `idCarta` deve ser único para cada carta distribuída.
- `idPokemon` deve ser compatível com o ID usado na PokéAPI.
- O retorno ideal deve conter 5 cartas, conforme a proposta do serviço de distribuição.
- Não deve repetir Pokémon para o mesmo jogador, se essa for a regra definida pela equipe de distribuição.
- Pode repetir Pokémon entre jogadores diferentes, se essa for a regra definida pela equipe de distribuição.

O que a Distribuição não precisa enviar:

- `name`
- `type`
- `stats`
- `imageUrl`
- `sprites`
- habilidades
- peso
- altura
- qualquer outro dado completo do Pokémon

Motivo: a Aplicação 4 usa o `idPokemon` recebido da Distribuição para consultar a PokéAPI
diretamente:

```text
https://pokeapi.co/api/v2/pokemon/{idPokemon}
```

Depois disso, o `pokemonMapper` transforma o JSON bruto da PokéAPI para o modelo interno usado na
tela.

Se a equipe de Distribuição retornar outro formato, por exemplo:

```json
[
  {
    "cardId": "card-001",
    "pokemonId": "1"
  }
]
```

ou:

```json
{
  "pokemons": ["1", "4", "7", "25", "39"]
}
```

a Aplicação 4 precisará criar/adaptar um mapper para converter esse formato para o padrão interno:

```json
{
  "cards": [
    {
      "idCarta": "card-001",
      "idPokemon": "1"
    }
  ]
}
```

#### PokéAPI

A PokéAPI externa será usada para buscar os dados completos do Pokémon.

Endpoint esperado:

```text
https://pokeapi.co/api/v2/pokemon/{idPokemon}
```

A Aplicação 4 espera do JSON bruto da PokéAPI pelo menos:

- `id`
- `name`
- `types`
- `stats`
- `sprites`

Esse JSON bruto não vai direto para a tela. Ele passa pelo `pokemonMapper`, que transforma os dados
para o modelo interno:

```json
{
  "id": 1,
  "name": "bulbasaur",
  "type": ["grass", "poison"],
  "stats": [
    {
      "name": "hp",
      "value": 45,
      "effort": 0
    }
  ],
  "imageUrl": "https://..."
}
```

#### Fluxo resumido

1. Usuário faz login/cadastro no Serviço de Jogadores.
2. A Aplicação 4 recebe token + user.
3. A Aplicação 4 envia o token para o Serviço de Distribuição de Cartas.
4. O Serviço de Distribuição retorna cards com `idCarta` + `idPokemon`.
5. A Aplicação 4 usa `idPokemon` para buscar os detalhes na PokéAPI.
6. O `pokemonMapper` transforma o JSON bruto da PokéAPI.
7. A tela renderiza as cartas com os dados tratados.

#### Cuidados importantes

- Não enviar dados completos do Pokémon pelo Serviço de Distribuição.
- A Distribuição deve enviar somente `idCarta` e `idPokemon`.
- `idPokemon` precisa ser compatível com a PokéAPI.
- Não depender diretamente do formato da PokéAPI nos componentes React.
- Qualquer diferença no JSON das equipes deve ser tratada em services/mappers.
- Manter `idCarta` e `idPokemon` como campos mínimos para integração.
- Manter token separado dos dados do usuário.

