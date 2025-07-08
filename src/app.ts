import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { BookRoutes } from './app/controller/book.controller';
import { BorrowRoute } from './app/controller/borrow.controller';
import cors from 'cors';

const app = express()
dotenv.config()
app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://l2-b5-assingment-4.vercel.app'],
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))


app.use(express.json())
app.use('/api/books', BookRoutes)
app.use('/api/borrow', BorrowRoute)

app.get('/', (req, res) => {
    res.send('Server is Running')
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        massage: 'Api not found!'
    })
})

app.use(errorHandler)

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    // if (res.headersSent) {
    //     return next(err)
    // }
    // res.status(500)
    // res.render('error', { error: err })
}





export default app