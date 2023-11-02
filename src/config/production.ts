import dotenv from 'dotenv';
dotenv.config();

export const production = {
    port: process.env.PORT
}