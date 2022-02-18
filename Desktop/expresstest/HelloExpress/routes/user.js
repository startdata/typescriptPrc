const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const mariadb = require('mariadb/callback');
const { createDeflate } = require('zlib');


//커넥션 연결
let client = mariadb.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "qwer1234",
  database: "nodejs"
})

//회원가입
router.get('/signup', function(req,res, next){
    res.render("user/signup");
});

router.post('/signup', async function(req,res,next){
    let body = req.body;
    
    let inputPassword = body.password;
    let hashPassword = crypto.createHash('sha512').update(inputPassword).digest("hex");

    let result = models.user.create({
        name: body.username,
        userID: body.userID,
        password: hashPassword
    })
    res.redirect("/user/login");
})

//로그인 GET
router.get('/login', function(req,res,next){
    let session = req.session;
    
    res.render('user/login', {
        session : session
    });
});

//로그인 POST
router.post('/login',async function(req,res,next){
    let body = req.body;
    
    let result = await models.user.findOne({
        where: {
            userID : body.userID
        }
    });

    let dbPassword =result.dataValues.password;
    let inputPassword = body.password;
    let hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");

    if(dbPassword === hashPassword){
        console.log('알맞은 비밀번호 입니다.');
        // // 쿠키
        // res.cookie('user',body.userID, {
        //     expires: new Date(Date.now()+ 100000),
        //     httpOnly: true
        // })

        // 세션
        req.session.userID = body.userID;

        res.redirect('/');
    }
    else{
        console.log("맞지 않은 비밀번호 입니다.");
        res.redirect('/user/login');
    }
});

// router.post('/sign_up', function(req, res, next){
//     let body = req.body;
//     client.query("INSERT INTO users (user_i_d, password,created_at,updated_at) VALUES (?,?,null,null);",[
//         body.userId, body.password
//     ], function(){
//         res.redirect("/user/sign_up");
//     })
// })

//로그아웃
router.get('/logout', function(req,res,next){
    //세션 삭제
    req.session.destroy();
    res.clearCookie('sj');

    res.redirect('/user/login')
})

module.exports = router;