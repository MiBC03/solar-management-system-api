const express = require('express');
const router = express.Router();
const clientesControler = require('../controllers/clientes');

router.get("/clientes", clientesControler.getClientes)
router.get("/clientes/:id", clientesControler.getUmCliente)
router.post("/clientes/create/",  clientesControler.addCliente)
router.put("/clientes/edit/:id", clientesControler.updateCliente)
router.delete("/clientes/:id",  clientesControler.deleteCliente)

module.exports = router;

