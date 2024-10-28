import express from 'express';
import cors from 'cors';
import apiRouter from './api';
import { BASE_URL_PREFIX } from './utils/constants';
import { mockAPI } from './mockAPI/request';

const app = express();

app.use(cors());
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(BASE_URL_PREFIX, apiRouter)



mockAPI("user/createUsers")

export default app;