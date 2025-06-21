import { model, Schema } from "mongoose";
import { TBook } from "../interface/book.interface";


const bookSchema = new Schema<TBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: { type: String, required: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: 1, required: true },
    available: { type: Boolean, default: true }
})

export const Book = model<TBook>('book', bookSchema)