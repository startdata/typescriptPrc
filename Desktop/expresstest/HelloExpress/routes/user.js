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


router.get('/sign_up', function(req,res, next){
    res.render("user/signup");
});

// router.get('log_in', function(req, res, next){
//     res.resnder("user/login");
// });

router.post('/sign_up', function(req,res,next){
    let body = req.body;
    models.user.create({
        name: body.username,
        ID: body.userID,
        password: body.password
    })
    .then(result => {
        res.redirect("/user/sign_up");
    })
    .catch(err => {
        console.log(err)
    })
})

// router.post("/sign_up",async function(req,res,next){
//     let body = req.body;
//     let inputPassword = body.password;
//     let hashPassword = crypto.createHash('sha512').update(inputPassword).digest("hex");

//     let result = models.user.create({
//         name: body.username,
//         ID: body.userID,
//         password : hashPassword
//     })
//     res.redirect("/user/sign_up");
// })



// router.get('/sign_up', function(req,res,fields){
//     client.query("SELECT * FROM users;")
// })


// router.post('/sign_up', function(req, res, next){
//     let body = req.body;
//     client.query("INSERT INTO user (user_i_d, password,created_at,updated_at) VALUES (?,?,null,null);",[
//         body.userId, body.password
//     ], function(){
//         res.redirect("/user/sign_up");
//     })
// })



module.exports = router;

