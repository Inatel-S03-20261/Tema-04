const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Armazena os dados enviados pelo Postman
let dadosJogador = null;

// Postman chama esse endpoint
app.post("/cartas", (req, res) => {
  const { idJogador, pokemons } = req.body;

  if (!idJogador || !pokemons || !Array.isArray(pokemons)) {
    return res.status(400).json({ erro: "JSON inválido" });
  }

  dadosJogador = { idJogador, pokemons };
  res.json({ mensagem: "Cartas recebidas com sucesso", dados: dadosJogador });
});

// Frontend chama esse endpoint
app.get("/cartas/:idJogador", async (req, res) => {
  if (!dadosJogador || dadosJogador.idJogador !== Number(req.params.idJogador)) {
    return res.status(404).json({ erro: "Nenhuma carta encontrada para esse jogador" });
  }

  try {
    const promises = dadosJogador.pokemons.map((nome) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then((r) => r.json())
        .then((data) => ({
          id: data.id,
          name: data.name,
          type: data.types.map((t) => t.type.name),
          hp: data.stats.find((s) => s.stat.name === "hp").base_stat,
          attack: data.stats.find((s) => s.stat.name === "attack").base_stat,
          defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
          imageUrl: data.sprites.other["official-artwork"].front_default,
        }))
    );

    const cartas = await Promise.all(promises);
    res.json({ idJogador: dadosJogador.idJogador, cartas });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar na PokéAPI", detalhe: err.message });
  }
});

app.listen(3001, () => console.log("Backend rodando em http://localhost:3001"));
