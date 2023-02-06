import User from "../models/User.js"
import jwt from "jsonwebtoken"

let getTodo = async (req, res) => {
  let token = req.headers.token
  if (token) {
    try {
      let user = jwt.verify(token, process.env.JWT_SECRET)
      let userInfo = await User.findOne({ username: user.username })
      res.json({
        success: true,
        response: "Fetched todos succesfully",
        data: userInfo.todos,
      })
    } catch (error) {
      res.json({
        success: false,
        response: "Authentication error, cannot verify token",
      })
    }
  } else {
    res.json({
      success: false,
      response: "Please log in and send a valid token",
    })
  }
}

export default getTodo
