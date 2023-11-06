import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import { dBSetup } from './lib/db';
import { config } from './config/index'
import {router as userRouter} from './routers/userRouter';
import { globalErrorHandler } from '../src/utils/globalErrHandler';

dotenv.config();

const app = express();

Promise.resolve(dBSetup().then(() => console.log('Database connected successfully')));

app.use(cors({
    credentials: true
}))

app.use(express.json());

const port = config.port || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.use(logger("tiny"));
app.get('/api/v1', (_req, res) => {
    res.send("Welcome to Nitoons!");
})

app.use(globalErrorHandler);

app.use("/api/v1/users", userRouter);