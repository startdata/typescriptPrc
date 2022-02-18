var express = require('express');
var router = express.Router();
const mariadb = require('mariadb/callback');


//커넥션 연결
let client = mariadb.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "qwer1234",
  database: "nodejs"
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/create', function(req, res, next) {
  client.query("SELECT * FROM products", function(err,result,fields){
    if(err){
      console.log(err);
      console.log("쿼리문에 문제가 있습니다.");
    }
    else{
      res.render('create', {
        results: result
      });
    }
  });
});

router.post('/create', function(req,res,next){
  let body = req.body;

  client.query("INSERT INTO products (name, modelnumber, series) VALUES (?,?,?)", 
  [
    body.name, body.modelnumber, body.series
  ], function(){
    res.redirect("/create");
  });
});

module.exports = router;