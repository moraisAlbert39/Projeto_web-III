const Vend = require('../models/vendModel');

//Cadastro e Atualização de dados
const cadastrar = async (req, res) => {
    const CPF = req.params.cpf;
        let Vendedor_CPF = {};
        let hidden = "";
        if (CPF){
            Vendedor_CPF = await Vend.findOne({cpf: CPF});
            hidden = 'hidden';
        }
        res.render("Vendedor/cadastrar", {Vendedor_CPF, hidden});
}

const cadastrarBD = async (req, res) => {
    const vendedor = req.body;
    if (vendedor.id){
        await Vend.findOneAndUpdate({cpf: vendedor.cpf},
        { 
            nomeV: vendedor.nomeV, 
            emailV: vendedor.emailV
        });
        res.redirect("/listarV")
    }else{
        const verificador_email = await Vend.findOne({emailV: vendedor.emailV});
        const verificador_cpf = await Vend.findOne({cpf: vendedor.cpf});
        if(verificador_email || verificador_cpf){
            res.redirect("/cadastro/Vend");
        } else{
        const novoVendedor = new Vend({
            nomeV: vendedor.nomeV,
            emailV: vendedor.emailV,
            cpf: vendedor.cpf
        });
        await novoVendedor.save();
        res.redirect("/listarV");
        }
    }
};

const listar = async (req, res) => {
    const listaV = await Vend.find();
    res.render("Vendedor/listar", {listaV});
};

const detalhar = async (req, res) => {
    const CPF = req.params.cpf;
    const resultadoV = await Vend.findOne({cpf: CPF});
    res.render('Vendedor/detalhar', {resultadoV});
};

const excluir = async (req, res) => {
    const CPF = req.params.cpf;
    await Vend.findOneAndDelete({cpf: CPF});
    res.redirect("/listarv");
};



module.exports = {cadastrar, cadastrarBD, listar, detalhar, excluir}