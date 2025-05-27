import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './routers/userRouter.js'
import gameRouter from './routers/gameRouter.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use('/', userRouter)
app.use('/', gameRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
