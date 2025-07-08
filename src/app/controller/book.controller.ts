import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const BookRoutes = express.Router()

// get all booking with filtering 
BookRoutes.get('/', async (req: Request, res: Response) => {
    const { filter, sort = 'desc', limit = 10 } = req.query



    const filterQuery: any = {}
    if (filter) {
        filterQuery.title = { $regex: filter, $options: 'i' }
    }

    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortQuery: Record<string, 1 | -1> = {};
    sortQuery[sortBy] = sort === 'desc' ? -1 : 1;


    const result = await Book.find(filterQuery).sort(sortQuery).limit(Number(limit))

    res.status(200).json({
        massage: 'Book retrieve successfully!',
        data: result
    })
})

// single book retrieve

BookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const result = await Book.findById(bookId)
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            })
        }
        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
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

// create a new book
BookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const doc = req.body
        const result = await Book.create(doc)

        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
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

// update a book
BookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = req.body
        const updateData = {
            ...data
        }
        const result = await Book.findByIdAndUpdate(bookId, updateData, { new: true })

        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            })
        }

        res.status(200).json({
            "success": true,
            "message": "Book Update successfully",
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

// Delete a book
BookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const result = await Book.findByIdAndDelete(bookId)

        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            })
        }

        res.status(200).json({
            "success": true,
            "message": "Book Delete successfully",
            "data": null
        })
    }
    catch (error: any) {
        res.status(400).json({
            "success": false,
            "message": 'Something went wrong!',
            error
        })
    }
})

