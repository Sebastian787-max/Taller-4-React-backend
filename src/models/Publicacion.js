// src/models/Publicacion.js
import { Schema, model } from 'mongoose';

const publicacionSchema = new Schema(
{
    autor_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // relación con usuario (autor)
        required: true
    },

    titulo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    contenido: {
        type: String,
        required: true,
        trim: true
    },

    fecha_publicacion: {
        type: Date,
        default: Date.now
    },

    stats: {
        likes: {
            type: Number,
            default: 0,
            min: 0
        },
        compartido: {
            type: Number,
            default: 0,
            min: 0
        }
    }
},
{
    timestamps: true // createdAt y updatedAt 
}
);

export default model('Publicacion', publicacionSchema);