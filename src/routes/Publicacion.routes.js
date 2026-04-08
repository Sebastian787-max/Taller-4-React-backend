// src/routes/Publicacion.routes.js
import { Router } from 'express';

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/publicacion.controller.js';

import {
    createPostValidator,
    updatePostValidator,
    idValidator
} from '../validators/publicacion.validator.js';

import { protect } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas CRUD:
 * GET    /api/posts           -> listar publicaciones
 * POST   /api/posts           -> crear publicación
 * GET    /api/posts/:id       -> obtener por ID
 * PUT    /api/posts/:id       -> actualizar
 * DELETE /api/posts/:id       -> eliminar
 */

// 🔒 todas las rutas protegidas (requiere login)
router.use(protect);

// 📄 Listar posts
router.get('/', getPosts);

// 📝 Crear post
router.post('/', createPostValidator, createPost);

// 🔍 Obtener post por ID
router.get('/:id', idValidator, getPostById);

// ✏️ Actualizar post
router.put('/:id', idValidator, updatePostValidator, updatePost);

// 🗑️ Eliminar post
router.delete('/:id', idValidator, deletePost);

export default router;