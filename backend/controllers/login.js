const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt')
const db = require('../db').pool

/* const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");*/

app.use(express.json());
app.use(
  cors(
    /*origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,*/
  ));

/*app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
*/

exports.postLogin = (req, res) => {
  const fun_email = req.body.fun_email;
  const fun_senha = req.body.fun_senha;

  db.query("SELECT * FROM tb_funcionario WHERE fun_email = ?", [fun_email], (err, result) => {
    if (err) {
      res.send({err: err});
    }
     
    if (result.length > 0) {
      bcrypt.compare(fun_senha, result[0].fun_senha, (err, response) => {
        if (response) {
          
          res.send({loginA: true});
        } else {
          
          res.send({loginA: false});
        }
      })
    } else {
      
      res.send({loginA: false});
    }
  });
};


/*exports.getLogin = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
}
*/