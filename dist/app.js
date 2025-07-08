"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_controller_1 = require("./app/controller/book.controller");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://l2-b5-assingment-4.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.BookRoutes);
app.use('/api/borrow', borrow_controller_1.BorrowRoute);
app.get('/', (req, res) => {
    res.send('Server is Running');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        massage: 'Api not found!'
    });
});
app.use(errorHandler);
function errorHandler(err, req, res, next) {
    console.log(err);
    // if (res.headersSent) {
    //     return next(err)
    // }
    // res.status(500)
    // res.render('error', { error: err })
}
exports.default = app;
