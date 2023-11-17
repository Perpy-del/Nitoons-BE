import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { config } from '../../config/index'

export const connectMongoDB = async () => {
  let connection
  try {
    connection = await mongoose.connect(config.dbUrl)
    return connection
  } catch (err) {
    console.log(err.message)
  }
}
