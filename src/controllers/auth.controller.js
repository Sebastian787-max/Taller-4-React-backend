// src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/**
 * POST /api/auth/login
 * Autentica usuario (autor) y devuelve JWT
 */
export const login = async (req, res, next) => {
    try {
        const {nombre,  email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Validar contraseña
        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Crear token (ahora enfocado a autor de posts)
        // Crear token (ahora enfocado a autor de posts)
        const token = jwt.sign(
            {
                uid: user._id,
                nombre: user.nombre,    // ← agregar aquí
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            token,
            user: {
                id: user._id,
                nombre: user.nombre,    // ← agregar aquí
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body;  // ← agregar nombre

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,          // ← agregar
            email,
            password: hashed,
            role: 'user'
        });

        res.status(201).json({
            message: 'Usuario creado correctamente',
            user: {
                id: user._id,
                nombre: user.nombre,   // ← agregar
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};