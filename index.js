import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send("Email não informado.");
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbwDPgnPsGkpV_GPek0mbeIrDTENT1xwQWOEOHUqo3jZIMx9RKRgVT7cPlPL4AzJcWap/exec";
  const fullURL = `${scriptURL}?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(fullURL);
    const text = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(text);
  } catch (error) {
    console.error("Erro ao consultar o Apps Script:", error);
    res.status(500).send("Erro ao consultar a planilha.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
