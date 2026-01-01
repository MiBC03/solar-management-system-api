const express = require('express');
const router = express.Router();
const financiamentosControllers = require('../controllers/financiamentos');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function( req, file, cb ){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
}
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ||
     file.mimetype === 'image/svg') {
        cb(null, true);
     } else {
        cb(null, false);
     }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single("fin_docComFoto");


router.get("/financiamentos", financiamentosControllers.getFinanciamentos)
router.get("/financiamentos/:id", financiamentosControllers.getUmFinanciamento)
router.get("/financiamento/:financiamentoId", financiamentosControllers.getUmFinanciamentoEsp)
router.post("/financiamentos/create", upload, financiamentosControllers.addFinanciamento)
router.put("/financiamentos/edit/:financiamentoId", financiamentosControllers.updateFinanciamento)
router.delete("/financiamentos/:id", financiamentosControllers.deleteFinancimaneto)

module.exports = router;