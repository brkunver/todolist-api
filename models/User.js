import { Schema, model } from "mongoose"

let UserSchema = new Schema({
  username: String,
  password: String,
  todos: [
    {
      todo: String,
      checked: Boolean,
    },
  ],
})

let User = new model("User", UserSchema)

export default User
