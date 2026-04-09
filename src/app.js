import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import publicacionRoutes from './routes/Publicacion.routes.js';

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://taller-4-react-fronend-zuy8.vercel.app/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// ✅ Rutas primero
app.get('/', (req, res) => {
    res.json({ ok: true, message: 'API funcionando 🚀' });
});

app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'posts-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', publicacionRoutes);

// ✅ Error handler siempre al final
app.use((err, req, res, next) => {
    console.error('❌ ERROR NO CONTROLADO:', err);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
