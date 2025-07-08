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
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.BookRoutes = express_1.default.Router();
// get all booking with filtering 
exports.BookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort = 'desc', limit = 10 } = req.query;
    const filterQuery = {};
    if (filter) {
        filterQuery.title = { $regex: filter, $options: 'i' };
    }
    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortQuery = {};
    sortQuery[sortBy] = sort === 'desc' ? -1 : 1;
    const result = yield book_model_1.Book.find(filterQuery).sort(sortQuery).limit(Number(limit));
    res.status(200).json({
        massage: 'Book retrieve successfully!',
        data: result
    });
}));
// single book retrieve
exports.BookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_model_1.Book.findById(bookId);
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
            "data": result
        });
    }
    catch (error) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        });
    }
}));
// create a new book
exports.BookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = req.body;
        const result = yield book_model_1.Book.create(doc);
        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
            "data": result
        });
    }
    catch (error) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        });
    }
}));
// update a book
exports.BookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = req.body;
        const updateData = Object.assign({}, data);
        const result = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true });
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Book Update successfully",
            "data": result
        });
    }
    catch (error) {
        res.status(400).json({
            "success": false,
            "message": 'Validation failed',
            error
        });
    }
}));
// Delete a book
exports.BookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": 'Book Not Found',
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Book Delete successfully",
            "data": null
        });
    }
    catch (error) {
        res.status(400).json({
            "success": false,
            "message": 'Something went wrong!',
            error
        });
    }
}));
