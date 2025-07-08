"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowModel = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'book' },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.static('updateBorrowCopy', function updateBorrowCopy(bookId, bookCopy, borrowBookInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateDoc = {
            copies: borrowBookInfo.copies - bookCopy,
            available: borrowBookInfo.copies - bookCopy === 0 ? false : true
        };
        yield book_model_1.Book.findByIdAndUpdate(bookId, updateDoc);
    });
});
exports.BorrowModel = (0, mongoose_1.model)('brow', borrowSchema);
