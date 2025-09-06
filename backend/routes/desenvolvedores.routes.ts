import { Router } from "express";
import { DesenvolvedoresController } from "../controllers/DesenvolvedoresController";
import { validaCriacaoDeDesenvolvedor } from "../middlewares/validaCriacaoDeDesenvolvedor";
import {validaAtualizacaoDeDesenvolvedor} from "../middlewares/validaAtualizacaoDeDesenvolvedor";
import { validaId } from "../middlewares/validaId";

const router = Router();
const desenvolvedoresController = new DesenvolvedoresController();

router.post("/", validaCriacaoDeDesenvolvedor, desenvolvedoresController.create);
router.get("/", desenvolvedoresController.findAll);
router.get("/:id", validaId, desenvolvedoresController.findById);
router.delete("/:id", validaId, desenvolvedoresController.deleteById);
router.patch("/:id", validaId, validaAtualizacaoDeDesenvolvedor, desenvolvedoresController.update);

export { router as desenvolvedoresRoutes };