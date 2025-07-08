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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.BorrowRoute = express_1.default.Router();
// Create a new Borrow
exports.BorrowRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowData = req.body;
        const isExistBook = yield book_model_1.Book.findById(borrowData.book);
        if (!isExistBook) {
            res.status(400).json({
                "success": false,
                "message": 'Book Not Found'
            });
        }
        else if ((isExistBook === null || isExistBook === void 0 ? void 0 : isExistBook.copies) < borrowData.quantity) {
            res.status(400).json({
                "success": false,
                "message": 'Book Quantity is must be less than book quantity'
            });
        }
        else if (new Date().getTime() > new Date(borrowData.dueDate).getTime()) {
            res.status(400).json({
                "success": false,
                "message": 'Please Select feature Date'
            });
        }
        else {
            const updateCopy = yield borrow_model_1.BorrowModel.updateBorrowCopy(borrowData.book, Number(borrowData.quantity), isExistBook);
            const result = yield borrow_model_1.BorrowModel.create(borrowData);
            res.status(200).json({
                "success": true,
                "message": "Book borrowed successfully",
                "data": result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        });
    }
}));
// Get Summery borrow book
exports.BorrowRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.BorrowModel.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error
        });
    }
}));
