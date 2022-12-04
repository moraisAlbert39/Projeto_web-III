const express = require('express')
const controller = require('../controller/vendController');
const router = express.Router();
const auth = require("../middlewares/userAuth");

router.get('/cadastro/Vend/:cpf?',auth, controller.cadastrar);
router.post('/cadastrarVend',auth, controller.cadastrarBD);
router.get('/listarV',auth,  controller.listar);
router.get('/vendedor/detalhar/:cpf',auth,  controller.detalhar);
router.get('/vendedor/deletar/:cpf',auth,  controller.excluir);


module.exports = router;