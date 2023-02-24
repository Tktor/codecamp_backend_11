// const express = require('express') // 옛날 방식 => commonjs
import express from 'express'         // 요즘 방식 => module

const app = express()

app.get('/qqq', function (req, res) { //미들웨어 함수
  res.send('Hello World')
})

app.listen(3000) //포트번호
  //기다린다