import express from 'express';
import dotenv from 'dotenv';
import { BookRoutes } from './app/controller/book.controller';
import { BorrowRoute } from './app/controller/borrow.controller';

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/books', BookRoutes)
app.use('/api/borrow', BorrowRoute)

app.get('/', (req, res) => {
    res.send('Server is Running')
})

export default app