import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from 'morgan'
import { dBSetup } from './lib/db'
import { config } from './config/index'
import { scriptRouter } from './controllers/routers/scriptRouter'
import { router as userRouter } from './controllers/routers/userRouter'
import { router as chapterRouter } from './controllers/routers/chapterRouter'
import { globalErrorHandler } from '../src/utils/globalErrHandler'
import { Server as SocketIOServer } from 'socket.io'

dotenv.config()

const app = express()

Promise.resolve(
  dBSetup().then(() => console.log('Database connected successfully')),
)

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
)

app.use(express.json())

const port = config.port || 5000

const server = http.createServer(app)
const io = new SocketIOServer(server)

io.on('connection', socket => {
  console.log('Client connected')

  socket.on('message', message => {
    console.log(`Received: ${message}`)
    io.emit('message', message)
  })

  socket.on('hello2', (arg, callback) => {
    console.log(arg) // "world"
    callback('got it')
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.use(logger('tiny'))
app.get('/api/v1', (_req, res) => {
  res.send('Welcome to Nitoons!')
})

app.use(globalErrorHandler)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/script', scriptRouter)
app.use('/api/v1/chapters', chapterRouter)
