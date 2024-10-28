import express from 'express';
import cors from 'cors';
import apiRouter from './api';
import { BASE_URL_PREFIX } from './utils/constants';
import { sendEmail } from './utils/email';


const app = express();

app.use(cors());
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(BASE_URL_PREFIX, apiRouter)


//sendEmail(['vipinv0647@gmail.com'], 'Dynamic Email Template with Handlebars', 'welcomeMessage', { accessCode: '123456' })



export default app;