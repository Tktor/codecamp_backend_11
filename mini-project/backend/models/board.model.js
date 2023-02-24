import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String
})

export const Board = mongoose.model("Board", boardSchema)
// 방어막 용도(필터링 역할)