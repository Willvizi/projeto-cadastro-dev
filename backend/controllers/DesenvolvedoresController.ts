import { Request, Response } from "express";
import { DesenvolvedoresService } from "../services/desenvolvedores.service";

export class DesenvolvedoresController {

    private desenvolvedoresService = new DesenvolvedoresService();

    async create(req: Request, res: Response) {
        try {
            const desenvolvedor = await this.desenvolvedoresService.create(req.body);
            res.status(201).json({
                message: "Desenvolvedor cadastrado",
                data: desenvolvedor
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao cadastrar desenvolvedor",
                error: error instanceof Error ? error.message : error
            });
        }
    }
}