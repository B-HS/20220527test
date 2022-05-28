var fs = require('fs')

const readFileForm = (where, requ, res)=>{fs.readFile(`./dist/${where}.html`,(err,data)=>{
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end(data);
})};

module.exports.index = (requ,res)=>{
    readFileForm("index", requ, res)
}
module.exports.join = (requ, res)=>{
    readFileForm("join", requ, res)
}

module.exports.login = (requ, res)=>{
    readFileForm("login", requ, res)
}


module.exports.joinPost = (req, res, next) => {
    const {body: {id, name, pass, email}} = req
    const temp = "가입"
    let vali=0
    let tmp =0

    //백단 유효성검사 id/pwd/name/email
    if(id == ""){
        res.send(fail("아이디", temp))
        return false
    }

    if(pass == ""){
        res.send(fail("비밀번호", temp))
        return false
    }

    if(name == ""){
        res.send(fail("이름", temp))
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
        res.send(fail("이메일", temp))
        console.log("-----------------------------------------")
        console.log("---------------JOIN PAGE----------------")
        console.log("┌────────────────────────────────────────")
        console.log(`│id: ${id}\n│password: ${pass}\n│name: ${name}\n│email: ${email}│vali:${vali} `)
        console.log("└────────────────────────────────────────")
        return false}
    else{
        //로컬스토리지(name저장)를 위해 파일을 쓰지않고 통쨰로 반환
        res.send(sucess(id, temp))
    }
        console.log("-----------------------------------------")
        console.log("---------------JOIN PAGE----------------")
        console.log("┌────────────────────────────────────────")
        console.log(`│id: ${id}\n│password: ${pass}\n│name: ${name}\n│email: ${email}`)
        console.log("└────────────────────────────────────────")
}


module.exports.loginPost = (req, res, next) => {
    const {body: {id, pass}} = req;
    const temp = "로그인"
    //백단 유효성검사 id/pwd
    if(id == ""){
        res.send(fail("아이디", temp))
        return false
    }

    if(pass == ""){
        res.send(fail("비밀번호", temp))
        return false
    }
    res.send(sucess(id, temp))
    console.log("---------------LOGIN PAGE----------------")
    console.log("┌────────────────────────────────────────")
    console.log(`│id: ${id}\n│password: ${pass}`)
    console.log("└────────────────────────────────────────")
    //아이디 저장/불러오기를 못하겠어요 ㅠㅠ..
}

module.exports.logout = (req, res, next) => {
    const {body: {name}} = req;
    res.send(logout())
}


//각 페이지용 템플릿
const sucess = (id, temp)=>(`
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
                <h1>${temp}완료 !  !</h1><span>2초 뒤 홈페이지로 돌아갑니다<span><a href="./">홈페이지로 돌아가기</a>
            </div>
            </body>
        </html>`
    )

const fail = (where, temp)=>(
    `<span>올바른 ${where}를 입력하세요</span> <br><a href="./login">${temp}페이지로 돌아가기</a>`
    )


const logout = ()=>(`
    <html>
        <head>
            <script>
            window.onload=()=>{
                window.localStorage.removeItem("name")
                setTimeout(() => {window.location.replace("./")}, 2000);}
            
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
            <h1>로그아웃 완료 !  !</h1><span>2초 뒤 홈페이지로 돌아갑니다<span><a href="./">홈페이지로 돌아가기</a>
        </div>
        </body>
    </html>`
)