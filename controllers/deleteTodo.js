import User from "../models/User.js"
import jwt from "jsonwebtoken"

let deleteTodo = async (req, res) => {
  let id = req.body.id
  let token = req.headers.token
  console.log(id , token)
  if (typeof token === "string" && typeof id === "string") {
    try {
      let user = jwt.verify(token, process.env.JWT_SECRET)
      let userInfo = await User.findOne({ username: user.username })
      let userTodos = userInfo.todos

      if(userTodos && userTodos.length > 0){
        let newTodoList = userTodos.filter(todo => todo._id != id)
        userInfo.todos = newTodoList
        await userInfo.save()
        res.json({
            success : true,
            response : "If exist, todo deleted"
        })
      }else{
        res.json({
            success :false,
            response : "You have no todos"
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
      response: "Please send a valid id and send a valid token",
    })
  }
}

export default deleteTodo
