import express from "express"
import addTodo from "../controllers/addTodo.js"
import getTodo from "../controllers/getTodo.js"
import deleteTodo from "../controllers/deleteTodo.js"

let router = express.Router()
router.route("/todo" ).get(getTodo).post(addTodo).delete(deleteTodo)


export default router