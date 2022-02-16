const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('combined'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req,res,next)=>{
    console.log('모든 요청 다 실행');
    next();
});
app.get('/', (req,res,next)=> {
    console.log('GET / 요청에서만 실행된다.');
    next();
}, (req,res)=>{
    throw new Error('에러 처리는 미들웨어로 ehlrh ')
});

app.use((err, req, res, next)=> {
    console.log(err);
    res.status(500).send(err.message);
});

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'),'번 포트로 대기중')
});