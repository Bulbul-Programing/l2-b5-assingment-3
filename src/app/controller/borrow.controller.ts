import express, { Request, Response } from 'express';
import { BorrowModel } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const BorrowRoute = express.Router()

// Create a new Borrow

BorrowRoute.post('/', async (req: Request, res: Response) => {
    try {
        const borrowData = req.body

        const isExistBook = await Book.findById(borrowData.book)
        if (!isExistBook) {
            res.status(400).json({
                "success": false,
                "message": 'Book Not Found!',
            })
        }

        const result = await BorrowModel.create(borrowData)

        res.status(200).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": result
        })
    }
    catch (error: any) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        })
    }
})