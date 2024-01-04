import dotenv from 'dotenv'
dotenv.config()

export const production = {
  port: process.env.PORT,
  dbUrl: process.env.PROD_DB_CONNECTION_URL,
  sendgridApiKey: process.env.PROD_SENDGRID_API_KEY,
  jwtSecret: process.env.PROD_JWT_ACCESS_TOKEN,
  sendgridSender: process.env.PROD_SENDER_EMAIL,
}
