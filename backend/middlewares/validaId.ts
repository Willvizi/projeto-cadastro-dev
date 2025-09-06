import {param, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

export const validaId = [
    param('id')
    .notEmpty()
    .withMessage('ID é obrigatório.')
    .isInt({min: 1})
    .withMessage('ID deve ser um número inteiro positivo.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];