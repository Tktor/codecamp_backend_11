// const express = require('express') // 옛날 방식 => commonjs
import express from 'express'         // 요즘 방식 => module
import {ProductController} from './mvc/controllers/product.controller.js'

const app = express()

// 상품 API
const productController = new ProductController()
app.post('/products/buy', productController.buyProduct) // 상품 구매하기 API
app.post('/products/refund', productController.refundProduct) // 상품 환불하기 API

// 게시판 API
// app.get("/boards/...")

app.listen(3000) //포트번호
  //기다린다