"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("./utils/data-source"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (req, res) => res.send("Teste Will!"));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));
data_source_1.default.initialize()
    .then(() => {
    console.log("Banco de dados iniciado com sucesso!");
})
    .catch((error) => {
    console.error("Erro ao iniciar o banco de dados:", error);
});
