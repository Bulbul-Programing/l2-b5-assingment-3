import express from 'express';
import dotenv from 'dotenv';

const app = express()
dotenv.config()

app.get('/', (req, res) => {
    res.send('Server is Running')
})

export default app