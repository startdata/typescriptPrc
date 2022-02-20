const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const mariadb = require('mariadb/callback');
const { createDeflate } = require('zlib');
const { body } = require('express-validator');

//커넥션 연결
let client = mariadb.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "qwer1234",
    database: "nodejs"
})

const signupCheck = [
    body('name' , "이름을 입력해주세요").notEmpty(),
    body('userId',"2자이상 8자이하 입력해주세요" ).isInt({min:2,max:8}),
    body('hashPassword',"6자이상 10자이하 입력해주세요").isInt({min:6,max:10})
]

//회원가입 
router.get('/signup', function (req, res, next) {
    res.render("user/signup");
});

router.post('/signup',signupCheck, async function (req, res, next) {
    let body = req.body;

    let inputPassword = body.password;
    let hashPassword = crypto.createHash('sha512').update(inputPassword).digest("base64");

    let result = models.user.create({
        name: body.username,
        userID: body.userID,
        password: hashPassword
    })
    res.redirect("/user/login");
})

//전체 조회
router.get('/index', async function (req, res, next) {
    const user = await models.user.findAll();
})

//로그인 GET
router.get('/login', function (req, res, next) {
    let session = req.session;

    res.render('user/loginOk', {
        session: session
    });
});

//로그인 POST
router.post('/login', async function (req, res, next) {
    let body = req.body;

    let result = await models.user.findOne({
        where: {
            userID: body.userID
        }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let hashPassword = crypto.createHash("sha512").update(inputPassword).digest("base64");

    if (dbPassword === hashPassword) {
        console.log('알맞은 비밀번호 입니다.');
        // 쿠키
        res.cookie('user', body.userID, {
            expires: new Date(Date.now() + 100000),
            httpOnly: true
        })

        // 세션
        req.session.userID = body.userID;

        res.redirect('/user/loginOk');
    }
    else {
        console.log("맞지 않은 비밀번호 입니다.");
        res.redirect('/user/login');
    }
});


//로그아웃
router.get('/loginOk', function (req, res, next) {
    //세션 삭제
    req.session.destroy();
    console.log('req.session.destroy();');
    res.clearCookie('sj');
    console.log("res.clearCookie('sj')");

    res.redirect('/')
})

router.delete('/delete', function (req, res, next) {
    models.user.destroy(
        //where
        {
            where: { id: req.params.id }
        }).then(() => {
            res.redirect('/user/signup')
        })
})

router.update('/update', function (req, res, next) {
    models.user.update(
        {
            name: body.username,
            userID: body.userID,
            password: hashPassword
        },
        //where절
        {
            where: { id: req.params.id }
        }).then(() => {
            res.redirect('/user/signup');
        })
})

module.exports = router;