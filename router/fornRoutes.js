const express = require('express')
const controller = require('../controller/fornController');
const router = express.Router();
const auth = require("../middlewares/userAuth");

router.post('/cadastrarForn',auth, controller.cadastrarBD);
router.get('/cadastro/Forn/:cnpj?',auth, controller.cadastrar);
router.get('/listarF',auth,  controller.listar);
router.get('/fornecedor/detalhar/:cnpj',auth,  controller.detalhar);
router.get('/fornecedor/deletar/:cnpj',auth,  controller.excluir);

module.exports = router;