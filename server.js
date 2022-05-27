const express = require('express')
const path =  require ('path')

const app = express()
app.set('port', process.env.PORT ??=12010)//포트 설정
const _path =  path.join(__dirname, "./dist")
app.use(express.static(_path))//use는 병렬로 뭔가 써야할떄





const PORT = app.get('port')
app.listen(PORT, ()=>{
    console.log(`http://127.0.0.1:${PORT}/`);
    console.log(`http://127.0.0.1:${PORT}/login`)
    console.log(`http://127.0.0.1:${PORT}/join`)
})