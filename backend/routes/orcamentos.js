const express = require('express');
const router = express.Router();
const financiamentosControllers = require('../controllers/orcamentos');

router.get("/orcamentos", financiamentosControllers.getOrcamento)
router.get("/orcamentos/:id", financiamentosControllers.getUmOrcamento)
router.get("/orcamento/:orcamentoId", financiamentosControllers.getUmOrcamentoEsp)
router.post("/orcamentos/create",  financiamentosControllers.addOrcamento)
router.put("/orcamentos/edit/:orcamentoId", financiamentosControllers.updateOrcamento)
router.delete("/orcamentos/:id", financiamentosControllers.deleteOrcamento)

module.exports = router;