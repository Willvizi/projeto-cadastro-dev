import "reflect-metadata";
import express, { Request, Response } from "express";
import AppDataSource from "./utils/data-source";
import { desenvolvedoresRoutes } from "./routes/desenvolvedorRoutes";
import { niveisRoutes } from "./routes/niveisRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/desenvolvedores", desenvolvedoresRoutes);
app.use("/api/niveis", niveisRoutes);

app.listen(3000, () => console.log(`Rodando na porta 3000!`));

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados iniciado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao iniciar o banco de dados:", error);
  });