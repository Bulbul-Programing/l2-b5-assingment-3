"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)('book', bookSchema);
