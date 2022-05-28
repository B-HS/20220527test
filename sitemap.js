var fs = require('fs')
module.exports.index = (requ,res)=>{
    fs.readFile('./dist/index.html',(err,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data);
    });
}


module.exports.join = (requ, res)=>{
    fs.readFile('./dist/join.html', (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data)
    })
}

module.exports.joincss = (requ, res)=>{
    fs.readFile('./dist/join.css', (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/css'})
        res.end(data)
    })
}


module.exports.login = (requ, res)=>{
    fs.readFile('./dist/login.html', (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data)
    })
}


module.exports.joinPost = (req, res, next) => {
    const {body: {id, name, pass, email}} = req
    let vali=0
    let tmp =0
    //백단 유효성검사 id/pwd/name/email
    if(id == ""){
        res.send(`<span>올바른 아이디를 입력하세요</span> <br><a href="./join">가입페이지로 돌아가기</a>`)
        return false
    }

    if(pass == ""){
        res.send(`<span>올바른 비밀번호를 입력하세요</span> <br><a href="./join">가입페이지로 돌아가기</a>`)
        return false
    }

    if(name == ""){
        res.send(`<span>올바른 이름을 입력하세요</span> <br><a href="./join">가입페이지로 돌아가기</a>`)
        return false
    }

    for(i of email.split("")){
        if(i == "."){
            if (tmp==1){
                vali+=2
            }else vali++
         }
        tmp = 0
        if(i =="@"){
            vali++
            tmp = 1   
        }   
    }
    console.log(vali);
    if (vali!=2){
        res.send(`<span>올바른 이메일을 입력하세요</span> <br><a href="./join">가입페이지로 돌아가기</a>`)
        console.log("-----------------------------------------")
        console.log("---------------JOIN PAGE----------------")
        console.log("┌────────────────────────────────────────")
        console.log(`│id: ${id}\n│password: ${pass}\n│name: ${name}\n│email: ${email}│vali:${vali} `)
        console.log("└────────────────────────────────────────")
        return false}
    else{
        //로컬스토리지(name저장)를 위해 파일을 쓰지않고 통쨰로 반환
        res.send(
        `<html>
            <head>
                <script>
                window.onload=()=>{setTimeout(() => 
                {window.location.replace("./")}, 2000);}
                window.localStorage.setItem("name", ${id})
                </script>
                <style>
                body{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                .box{
                    float:left;
                    margin:0 auto;
                    text-align:center;
                }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>가입 완료 !  !</h1><span>2초 뒤 홈페이지로 돌아갑니다<span><a href="./">홈페이지로 돌아가기</a>
                </div>
            </body>
        </html>`
    )
    }
        console.log("-----------------------------------------")
        console.log("---------------JOIN PAGE----------------")
        console.log("┌────────────────────────────────────────")
        console.log(`│id: ${id}\n│password: ${pass}\n│name: ${name}\n│email: ${email}`)
        console.log("└────────────────────────────────────────")
}


module.exports.loginPost = (req, res, next) => {
    const {body: {id, pass}} = req;

    //백단 유효성검사 id/pwd
    if(id == ""){
        res.send(`<span>올바른 아이디를 입력하세요</span> <br><a href="./login">로그인페이지로 돌아가기</a>`)
        return false
    }

    if(pass == ""){
        res.send(`<span>올바른 비밀번호를 입력하세요</span> <br><a href="./login">로그인페이지로 돌아가기</a>`)
        return false
    }
    res.send(`
        <html>
            <head>
                <script>
                window.onload=()=>{setTimeout(() => 
                {window.location.replace("./")}, 2000);}
                window.localStorage.setItem("name", ${id})
                </script>
                <style>
                body{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                .box{
                    float:left;
                    margin:0 auto;
                    text-align:center;
                }
                </style>
            </head>
            <body>
            <div class="box">
                <h1>로그인 완료 !  !</h1><span>2초 뒤 홈페이지로 돌아갑니다<span><a href="./">홈페이지로 돌아가기</a>
            </div>
            </body>
        </html>`
    )
    console.log("---------------LOGIN PAGE----------------")
    console.log("┌────────────────────────────────────────")
    console.log(`│id: ${id}\n│password: ${pass}`)
    console.log("└────────────────────────────────────────")
    //아이디 저장/불러오기를 못하겠어요 ㅠㅠ..
}

module.exports.logout = (req, res, next) => {
    const {body: {name}} = req;
    res.send(`
        <script>
            window.localStorage.removeItem("name", ${name})
            window.location.replace("./")
        </script>`
            )

}
