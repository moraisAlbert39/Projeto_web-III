const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const session = require("express-session");


const cadastrarU = async (req, res) => {
    const EMAIL = req.params.email;
        let usuario = {};
        hidden = "";
        if (EMAIL){
            usuario = await User.findOne({email: EMAIL});
            hidden = "hidden";
        }

        res.render("usuario/cadastrar", {usuario, hidden});
}

const cadastrarBD = async (req, res) => {
    const usuario = req.body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(usuario.senha, salt);
    if (usuario.id){
        await User.findOneAndUpdate({email: usuario.email},
        { 
            nome: usuario.nome, 
            senha: hash
        });
        res.redirect("/listarU")
    }else{
        const EMAIL = await User.findOne({email: usuario.email});
        if(EMAIL){
            res.redirect("/cadastro/user");
        } else{
        const novoUsuario = new User({
            nome: usuario.nome,
            email: usuario.email,
            senha: hash
            
        });
        await novoUsuario.save();
        res.redirect("/listarU");
        }
    }
};

const listarU = async (req, res) => {
    const s = req.query.s;
    const listaU = await User.find();
    res.render("usuario/listar", {listaU});
};

const detalharU = async (req, res) => {
    const EMAIL = req.params.email;
    const resultadoU = await User.findOne({email: EMAIL});
    res.render('usuario/detalhar', {resultadoU});
};

const excluir = async (req, res) => {
    const EMAIL = req.params.email;
    await User.findOneAndDelete({email: EMAIL});
    res.redirect("/listarU");
};

const login = async (req, res) => {
    const user = req.session.usuario;
    if (user){
        res.redirect("/");
    } else{
        const erro = req.query.e;
        res.render("usuario/login", {erro});
    }
}


const logout = async (req, res) => {
    req.session.usuario = undefined;
    res.redirect("/usuario/login");
}


const logBD = async (req, res) => {
    const dados_login = req.body;
    const verifica_email = await User.findOne({email: dados_login.email});
    if (verifica_email){

        if (bcrypt.compareSync(dados_login.senha, verifica_email.senha)){
            console.log(verifica_email.email)
            console.log(req.session.dados_login)
            req.session.dados_login = verifica_email.email;
            
            res.redirect("/home");
        } else{
            res.send("Email ou senha incorretos! Tente novamente.");
        }
    }else{
        res.send("Email ou senha incorretos! Tente novamente.");
    }
}

module.exports = {cadastrarBD, cadastrarU, listarU, detalharU, excluir, logBD, login, logout};