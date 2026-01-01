const express = require('express')
const routerLogin = express.Router()
const loginControllers = require('../controllers/login')

routerLogin.post("/login/", loginControllers.postLogin)
/*routerLogin.get("/login/", loginControllers.getLogin)*/

module.exports = routerLogin;
