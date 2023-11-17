import dotenv from 'dotenv'
dotenv.config()

export const development = {
  port: process.env.PORT,
  dbUrl: process.env.DEV_DB_CONNECTION_URL,
  sendgridApiKey: process.env.DEV_SENDGRID_API_KEY,
  jwtSecret: process.env.DEV_JWT_ACCESS_TOKEN,
  sendgridSender: process.env.DEV_SENDER_EMAIL,
}
