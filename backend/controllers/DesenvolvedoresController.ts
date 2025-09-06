import { Request, Response, NextFunction } from "express";
import { DesenvolvedoresService } from "../services/desenvolvedores.service";

export class DesenvolvedoresController {

    private desenvolvedoresService = new DesenvolvedoresService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const desenvolvedor = await this.desenvolvedoresService.create(req.body);
            res.status(201).json({
                data: desenvolvedor
            });
        } catch (error) {
            next(error);
        }
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const desenvolvedores = await this.desenvolvedoresService.findAll();
            res.status(200).json({
                data: desenvolvedores
            });
        } catch (error) {
            next(error);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const desenvolvedor = await this.desenvolvedoresService.findById(id);
            if (!desenvolvedor) {
                return res.status(404).json({ error: 'Desenvolvedor não encontrado.' });
            }
            res.status(200).json({
                data: desenvolvedor
            });
        } catch (error) {
            next(error);
        }
    }

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const desenvolvedor = await this.desenvolvedoresService.findById(id);
            if (!desenvolvedor) {
                return res.status(404).json({ error: 'Desenvolvedor não encontrado.' });
            }
            await this.desenvolvedoresService.deleteById(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const desenvolvedor = await this.desenvolvedoresService.findById(id);
            if (!desenvolvedor) {
                return res.status(404).json({ error: 'Desenvolvedor não encontrado.' });
            }
            const desenvolvedorAtualizado = await this.desenvolvedoresService.update(id, req.body);
            res.status(200).json({
                data: desenvolvedorAtualizado
            });
        } catch (error) {
            next(error);
        }
    }
}