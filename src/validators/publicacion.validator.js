// src/validators/publicacion.validator.js
import { body, param } from 'express-validator';

/** Validar ID */
export const idValidator = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),
];

/** Crear publicación */
export const createPostValidator = [
    body('titulo')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ max: 150 })
        .withMessage('Título demasiado largo'),

    body('contenido')
        .trim()
        .notEmpty()
        .withMessage('El contenido es obligatorio'),

    // stats opcional 
    body('stats.likes')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Likes debe ser un número positivo'),

    body('stats.compartido')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Compartido debe ser un número positivo'),
];

/** Actualizar publicación */
export const updatePostValidator = [
    ...idValidator,

    body('titulo')
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage('Título demasiado largo'),

    body('contenido')
        .optional()
        .trim(),

    body('stats.likes')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Likes debe ser un número positivo'),

    body('stats.compartido')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Compartido debe ser un número positivo'),
];