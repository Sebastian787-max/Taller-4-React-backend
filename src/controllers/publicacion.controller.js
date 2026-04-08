// src/controllers/post.controller.js
import { validationResult } from 'express-validator';
import Post from '../models/Publicacion.js';

const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true;
    }
    return false;
};

/** Crear post */
export const createPost = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const payload = {
            autor_id: req.body.autor_id,
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            fecha_publicacion: new Date(),
            stats: {
                likes: req.body.stats?.likes ?? 0,
                compartido: req.body.stats?.compartido ?? 0
            }
        };

        const created = await Post.create(payload);
        res.status(201).json(created);

    } catch (err) {
        next(err);
    }
};

/** Listar posts */
/** Listar posts */
export const getPosts = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        const filter = q
            ? {
                $or: [
                    { titulo: new RegExp(q, 'i') },
                    { contenido: new RegExp(q, 'i') }
                ]
            }
            : {};

        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            Post.find(filter)
                .populate('autor_id', 'email nombre')
                .populate('autor_id', 'email')  // ← agregar esta línea
                .sort({ fecha_publicacion: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Post.countDocuments(filter)
        ]);

        res.json({
            items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });

    } catch (err) {
        next(err);
    }
};

/** Obtener post por ID */
export const getPostById = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const item = await Post.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(item);

    } catch (err) {
        next(err);
    }
};

/** Actualizar post */
export const updatePost = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(updated);

    } catch (err) {
        next(err);
    }
};

/** Eliminar post */
export const deletePost = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const deleted = await Post.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json({ message: 'Eliminado correctamente' });

    } catch (err) {
        next(err);
    }
};