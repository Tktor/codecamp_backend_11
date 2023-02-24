import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name : String,
  email : String,
  personal : String,
  prefer : String,
  pwd : String,
  phone : String  
})

export const Users = mongoose.model("Users", UserSchema)