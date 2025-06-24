import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { BookRoutes } from './app/controller/book.controller';
import { BorrowRoute } from './app/controller/borrow.controller';

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/books', BookRoutes)
app.use('/api/borrow', BorrowRoute)
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

app.get('/', (req, res) => {
    res.send('Server is Running')
})




export default app