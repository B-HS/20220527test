// path, express, bodyparser, sitemap 설정
const path = require("path")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const loogger = require('morgan')
const sitemap = require('./sitemap')

// express 포트설정
app.set('port', process.env.PORT ??=12010)
const PORT = app.get('port')

// "/" 기본주소 설정(안하면 css 못불러옴)
const _path = path.join(__dirname, './dist');
app.use(express.static(_path));


// bodyparser 설정
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended : false } ))

// 서버에 모건 적용
app.use(loogger('tiny'));


// get요청
app.get("/", sitemap.index)
app.get("/join", sitemap.join)
app.get("/login", sitemap.login)
app.get("/logout", sitemap.logout)


// post요청
app.post("/join", sitemap.joinPost)
app.post("/login", sitemap.loginPost)




//서버오픈
app.listen(PORT, ()=>{
    console.log(`http://127.0.0.1:${PORT}/`)
})
