const express = require('express')
const controller = require('../controller/userController');
const router = express.Router();
const auth = require("../middlewares/userAuth");


router.post('/cadastrarUser', controller.cadastrarBD);
router.get('/cadastro/user/:email?', controller.cadastrarU);
router.get('/listarU',auth,  controller.listarU);
router.get('/usuario/detalhar/:email',auth,  controller.detalharU);
router.get('/usuario/deletar/:email',auth,  controller.excluir);
router.get('/usuario/login', controller.login);
router.get('/usuario/logout', controller.logout)
router.post('/usuariologin', controller.logBD)

module.exports = router;