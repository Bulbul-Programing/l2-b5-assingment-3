import { model, Schema } from "mongoose";
import { TBorrow } from "../interface/borrow .interface";

const borrowSchema = new Schema<TBorrow>({
    book: { type: Schema.ObjectId, required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
})

export const BorrowModel = model<TBorrow>('brow', borrowSchema)