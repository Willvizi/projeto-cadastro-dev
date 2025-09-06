import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../utils/data-source";

export const validaCriacaoDeDesenvolvedor = [
    body('id')
        .not()
        .exists()
        .withMessage('ID não deve ser fornecido na criação, ele será gerado automaticamente'),

    body('nome')
        .trim()
        .isString()
        .withMessage('Nome deve conter apenas letras.')
        .notEmpty()
        .withMessage('Nome é obrigatório.')
        .isLength({ min: 5, max: 120 })
        .withMessage('Nome deve ter entre 5 e 120 caracteres.'),

    body('data_nascimento')
        .isDate()
        .withMessage('Data de nascimento inválida.')
        .notEmpty()
        .withMessage('Data de nascimento é obrigatória.')
        .isBefore(new Date().toISOString())
        .withMessage('Data de nascimento deve ser uma data passada.'),

    body('sexo')
        .trim()
        .isLength({ min: 1, max: 1 })
        .withMessage('Sexo deve ser um caractere.')
        .notEmpty()
        .withMessage('Sexo é obrigatório.'),

    body('nivel_id')
        .notEmpty()
        .trim()
        .withMessage('Nivel e obrigatório')
        .isInt({ min: 1 })
        .withMessage('Nível deve ser um número inteiro válido.')
        .custom(async (value) => {
            const niveisRepository = AppDataSource.getRepository('nivel');
            const nivel = await niveisRepository.findOne({ where: { id: value } });
            if (!nivel) {
                throw new Error('Nível não encontrado.');
            }
        }),


    body('hobby')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Hobby deve ter no máximo 50 caracteres.'),

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

