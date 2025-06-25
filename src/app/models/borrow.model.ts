import { Model, model, Schema } from "mongoose";
import { TBorrow } from "../interface/borrow .interface";
import { Book } from "./book.model";
import { TBook } from "../interface/book.interface";

interface borrowInstanceMethod extends Model<TBorrow> {
    updateBorrowCopy(bookId: string, bookCopy: number, borrowBookInfo: TBook): any
}

const borrowSchema = new Schema<TBorrow, borrowInstanceMethod>({
    book: { type: Schema.ObjectId, required: true, ref : 'book' },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
})

borrowSchema.static('updateBorrowCopy', async function updateBorrowCopy(bookId: string, bookCopy: number, borrowBookInfo: TBook) {
    const updateDoc = {
        copies: borrowBookInfo.copies - bookCopy,
        available: borrowBookInfo.copies - bookCopy === 0 ? false : true
    }
    await Book.findByIdAndUpdate(bookId, updateDoc)
})

export const BorrowModel = model<TBorrow, borrowInstanceMethod>('brow', borrowSchema)