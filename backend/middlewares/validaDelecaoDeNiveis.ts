import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../utils/data-source";

export const validaDelecaoDeNiveis = [

    param('id')
    .custom(async (value) => {
        const desenvolvedoresRepository = AppDataSource.getRepository('desenvolvedor');

        const desenvolvedorVinculado = await desenvolvedoresRepository.findOne({ 
                where: { nivel_id: parseInt(value) } 
            });
            
            if (desenvolvedorVinculado) {
                throw new Error('Não é possível deletar este nível pois existem desenvolvedor vinculados a ele.');
            }
    }),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Dados inválidos',
                details: errors.array().map(err => ({
                    field: err.type === 'field' ? err.path : 'unknown',
                    message: err.msg
                }))
            });
        }

        next();
    }
]

