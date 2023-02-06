import User from "../models/User.js"
import jwt from "jsonwebtoken"

let addTodo = async (req, res) => {
  let newTodo = req.body.todo
  //console.log(newTodo)
  let token = req.headers.token
  //check if token exist
  if (typeof token === "string") {
    //check if todo is valid
    if (
      newTodo &&
      typeof newTodo.todo === "string" &&
      typeof newTodo.checked === "boolean"
    ) {
      try {
        //try to verify user
        let user = jwt.verify(token, process.env.JWT_SECRET)

        //get user object
        let userInfo = await User.findOne({ username: user.username })

        //fetch user's todos
        let userTodos = userInfo.todos
        if (!userTodos) {
          userInfo.todos = [{ ...newTodo }]
          await userInfo.save()
          res.json({
            success: true,
            response: "Succesfully added todo",
          })
        }
        //check if user has less than ten todos
        else if (userTodos.length < 10) {
          userInfo.todos.push(newTodo)
          await userInfo.save()
          res.json({
            success: true,
            response: "Succesfully added todo",
          })
        } else {
          res.json({
            success: false,
            response: "You can not have more than ten todos",
          })
        }
      } catch (error) {
        res.json({
          success: false,
          response: "Token error. Your token is invalid",
        })
      }
    } else {
      res.json({
        success: false,
        response: "Please send a valid todo object",
      })
    }
  } else {
    res.json({
      success: false,
      response: "Please log in and send a valid token",
    })
  }
}

export default addTodo
