import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String
})

export const Board = mongoose.model("Board", boardSchema)

const checkPhoneSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean
})

export const checkPhones = mongoose.model("checkPhones", checkPhoneSchema)

// 방어막 용도(필터링 역할)