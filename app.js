import * as dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import express from "express"
import cookieParser from "cookie-parser"

//Routes
import authRouter from "./routes/authRoutes.js"
import todoRouter from "./routes/todoRoutes.js"

// security middlewares
import xss from "xss-clean"
import ExpressMongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit"

let app = express()

app.use(
  rateLimit({
    max: 150,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests !",
  })
)

app.use(express.json())
app.use(xss())
app.use(ExpressMongoSanitize())
app.use(cookieParser())

mongoose.set("strictQuery", true)

app.use("/api/v1", authRouter)
app.use("/api/v1", todoRouter)

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    response: "Can not found this route",
  })
})

mongoose.connect(process.env.DB_URL, (err) => {
  err
    ? console.log(err)
    : app.listen(process.env.PORT || 3000, console.log("Server started"))
})
