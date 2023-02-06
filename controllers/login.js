import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

let login = async (req, res) => {
  let { username, password } = req.body
  if (!username || !password) {
    res.json({
      success: false,
      response: "Please enter a valid username and password",
    })
  } else {
    try {
      let user = await User.findOne({ username })
      let validation = await bcrypt.compare(password, user.password)
      if (!validation) {
        res.json({
          success: false,
          response: "Please enter a valid password",
        })
      } else {
        let token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        })
        res.status(200).setHeader("token", token).json({
          success: true,
          response: "Login Successful",
        })
      }
    } catch {
      res.json({
        success: false,
        response: "Please enter a valid username and password",
      })
    }
  }
}

export default login
