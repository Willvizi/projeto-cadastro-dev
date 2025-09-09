import { Router } from "express";
import { DesenvolvedoresController } from "../controllers/DesenvolvedoresController";
import { validaCriacaoNiveis } from "../middlewares/validaCriacaoNiveis";
import { validaAtualizacaoDeDesenvolvedor } from "../middlewares/validaAtualizacaoDeDesenvolvedor";
import { validaId } from "../middlewares/validaId";
import { NiveisController } from "../controllers/NiveisController";
import { validaCriacaoDeDesenvolvedor } from "../middlewares/validaCriacaoDeDesenvolvedor";
import { validaDelecaoDeNiveis } from "../middlewares/validaDelecaoDeNiveis";

const router = Router();
const niveisController = new NiveisController();

router.post("/", validaCriacaoNiveis, niveisController.create);
router.get("/", niveisController.findAll);
router.get("/:id", validaId, niveisController.findById);
router.delete("/:id", validaId, validaDelecaoDeNiveis, niveisController.deleteById);
router.patch("/:id", validaId, validaCriacaoNiveis, niveisController.update);

export { router as niveisRoutes };