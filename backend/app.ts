import "reflect-metadata";
import express, { Request, Response } from "express";
import AppDataSource from "./utils/data-source";
import { desenvolvedoresRoutes } from "./routes/desenvolvedores.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Teste Will!"));
app.use("/api/desenvolvedores", desenvolvedoresRoutes);
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados iniciado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao iniciar o banco de dados:", error);
  });