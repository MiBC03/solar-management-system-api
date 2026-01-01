const express = require('express');
const router = express.Router();
const funcionariosControler = require('../controllers/funcionarios');

router.post("/funcionario/create/",  funcionariosControler.addFuncionario)

module.exports = router;
