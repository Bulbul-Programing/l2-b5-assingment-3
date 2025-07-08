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
                "message": 'Book Not Found'
            })
        }

        else if (isExistBook?.copies < borrowData.quantity) {
            res.status(400).json({
                "success": false,
                "message": 'Book Quantity is must be less than book quantity'
            })
        }
        else if (new Date().getTime() > new Date(borrowData.dueDate).getTime()) {
            res.status(400).json({
                "success": false,
                "message": 'Please Select feature Date'
            })
        }
        else {
            const updateCopy = await BorrowModel.updateBorrowCopy(borrowData.book, Number(borrowData.quantity), isExistBook)
            
            const result = await BorrowModel.create(borrowData)
            res.status(200).json({
                "success": true,
                "message": "Book borrowed successfully",
                "data": result
            })
        }


    }
    catch (error: any) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        })
    }
})

// Get Summery borrow book

BorrowRoute.get('/', async (req: Request, res: Response) => {
    try {
        const result = await BorrowModel.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error
        });
    }
})