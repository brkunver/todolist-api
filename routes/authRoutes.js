import express from "express"
import signUp from "../controllers/signUp.js"
import login from "../controllers/login.js"

let router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)

export default router
