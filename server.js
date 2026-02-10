const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API success");
});

// rota de clima
app.get("/clima", async (req, res) => {
  const cidade = req.query.cidade;

  if (!cidade) {
    return res.status(400).json({ erro: "Cidade não informada" });
  }

  try {
    const resposta = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.API_KEY}&units=metric&lang=pt_br`
    );

    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar clima" });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});