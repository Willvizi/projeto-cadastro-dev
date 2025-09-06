import "reflect-metadata";
import express, { Request, Response } from "express";
import AppDataSource from "./utils/data-source";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => res.send("Teste Will!"));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados iniciado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao iniciar o banco de dados:", error);
  });