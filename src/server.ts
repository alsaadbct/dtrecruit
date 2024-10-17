import express from 'express';
import cors from 'cors';
import apiRouter from './api';

const app = express();

app.use(cors());
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use('/dtrecruit/v1', apiRouter)

export default app;