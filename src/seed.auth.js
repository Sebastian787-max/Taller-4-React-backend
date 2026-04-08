import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
export async function seedAuth() {
    try {
        await User.deleteMany({});

        const hashed = await bcrypt.hash('123456', 10);

        await User.create({
            nombre: 'Admin',
            email: 'admin@demo.com',
            password: hashed,
            role: 'admin'
        });
        console.log('✅ Usuario admin creado');
        console.log('Email: admin@demo.com');
        console.log('Password: 123456');
    } catch (error) {
        console.error('❌ Error en el seeder:', error.message);
    }
}

// Para ejecutar manualmente si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    async function run() {
        await mongoose.connect(process.env.MONGODB_URI);
        await seedAuth();
        await mongoose.disconnect();
    }
    run();
}