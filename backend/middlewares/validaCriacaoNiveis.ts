import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../utils/data-source";

export const validaCriacaoNiveis = [
    body('id')
        .not()
        .exists()
        .withMessage('ID não deve ser fornecido na criação, ele será gerado automaticamente'),

    body('nivel')
        .notEmpty()
        .trim()
        .withMessage('Nivel e obrigatório')
        .isString()
        .withMessage('Nível deve ser conter apenas letras.')
        .custom(async (value) => {
            const niveisRepository = AppDataSource.getRepository('nivel');
            const nivel = await niveisRepository.findOne({ where: { nivel: value } });
            if (nivel) {
                throw new Error('Nível já existe.');
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

