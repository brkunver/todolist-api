import User from "../models/User.js"
import bcrypt from "bcryptjs"

let signUp = async (req, res) => {
  let { username, password } = req.body
  if (!username || !password) {
    res.json({
      success: false,
      response: "Please enter a valid username or password",
    })
  } else {
    let result = await User.exists({ username })
    if (!result) {
      let hashedPassword = await bcrypt.hash(password, 10)
      try {
        await User.create({
          username: username,
          password: hashedPassword,
          todos: [
            {
              todo: "Add more todos",
              checked : false
            },
          ],
        })
        res.json({
          success: true,
          response: "User Created",
        })
      } catch {
        res.json({
          success: false,
          response: "An error occured while creating user",
        })
      }
    } else {
      res.json({
        success: false,
        response: "This username is already used",
      })
    }
  }
}

export default signUp
