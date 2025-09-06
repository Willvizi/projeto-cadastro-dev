import "reflect-metadata";
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => res.send("Teste Will!"));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));