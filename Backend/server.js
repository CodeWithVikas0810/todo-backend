import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import todoRoutes from './routes/todo.routes.js'
import userRoutes from './routes/user.routes.js'
import {
    connectDB
} from './config/db.js'


dotenv.config()

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));


app.use(express.json())


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("server is running")
})
app.use("/api/auth", userRoutes)
app.use("/api/todos", todoRoutes)


app.listen(PORT, () => {
    connectDB()
    console.log(`server is running on port ${PORT}`)
})