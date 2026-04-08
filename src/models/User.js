import { Schema, model } from 'mongoose';
/**
* Usuario del sistema
* - email: para login
* - password: hash con bcrypt
* - role: admin / user (opcional para clases futuras)
*/
const userSchema = new Schema(
    {
        nombre: {                    // ← agregar
            type: String,
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    { timestamps: true }
);
export default model('User', userSchema);