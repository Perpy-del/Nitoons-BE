import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from './config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';

dotenv.config();

const app = express();


app.use(cors({
    credentials: true
}))

app.use(express.json());

const port = process.env.PORT || 5000;
// const port = config.port || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Listening on port 8080');
})

mongoose
  .connect(process.env.DEV_DB_CONNECTION_URL)
  .then(() => console.log("Database connected successfully")) 
  .catch((err) => {
    console.log(err.message);
  });

app.use(logger("tiny"));
app.get('/api/v1', (_req, res) => {
    res.send("Welcome to Nitoons!");
})