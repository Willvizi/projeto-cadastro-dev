import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../utils/data-source";

export const validaAtualizacaoDeDesenvolvedor = [
    body('id')
        .not()
        .exists()
        .withMessage('ID não deve ser fornecido no corpo da requisição'),

    body('nome')
        .optional()
        .trim()
        .isString()
        .withMessage('Nome deve conter apenas letras.')
        .isLength({ min: 5, max: 120 })
        .withMessage('Nome deve ter entre 5 e 120 caracteres.'),

    body('data_nascimento')
        .optional()
        .isDate()
        .withMessage('Data de nascimento inválida.')
        .isBefore(new Date().toISOString())
        .withMessage('Data de nascimento deve ser uma data passada.'),

    body('sexo')
        .optional()
        .trim()
        .isLength({ min: 1, max: 1 })
        .withMessage('Sexo deve ser um caractere.')
        .notEmpty()
        .withMessage('Sexo é obrigatório.'),

    body('nivel_id')
        .optional()
        .trim()
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

