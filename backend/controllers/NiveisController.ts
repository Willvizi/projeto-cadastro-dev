import { Request, Response, NextFunction } from "express";
import { NiveisService } from "../services/niveis.service";
import { obtemParametorsDePaginacao, criaRespostaPaginada } from "../utils/paginacao";

export class NiveisController {
    private niveisService: NiveisService;

    constructor() {
        this.niveisService = new NiveisService();
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const novoNivel = await this.niveisService.create(req.body);
            res.status(201).json(novoNivel);
        } catch (error) {
            next(error);
        }
    }
    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit, offset } = obtemParametorsDePaginacao(req);
            const result = await this.niveisService.findAll(limit, offset);
            const response = criaRespostaPaginada(result.niveis, result.total, page, limit);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const nivel = await this.niveisService.findById(Number(id));
            if (!nivel) {
                return res.status(404).json({ error: 'Nível não encontrado' });
            }
            res.status(200).json(nivel);
        } catch (error) {
            next(error);
        }
    }
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const nivelAtualizado = await this.niveisService.update(Number(id), req.body);
            if (!nivelAtualizado) {
                return res.status(404).json({ error: 'Nível não encontrado' });
            }
            res.status(200).json(nivelAtualizado);
        } catch (error) {
            next(error);
        }
    }
    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const nivel = await this.niveisService.findById(Number(id));
            if (!nivel) {
                return res.status(404).json({ error: 'Nível não encontrado' });
            }
            await this.niveisService.deleteById(Number(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}