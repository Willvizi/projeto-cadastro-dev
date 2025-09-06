import { Router } from "express";
import { DesenvolvedoresController } from "../controllers/DesenvolvedoresController";

const router = Router();
const desenvolvedoresController = new DesenvolvedoresController();

router.post("/desenvolvedores", desenvolvedoresController.create);

export { router as desenvolvedoresRoutes };