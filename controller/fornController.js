const Forn = require('../models/fornModel');


//Cadastro e Atualização de dados
const cadastrar = async (req, res) => {
    const CNPJ = req.params.cnpj;
        let Fornecedor_cnpj = {};
        let hidden = "";
        if (CNPJ){
            Fornecedor_cnpj = await Forn.findOne({cnpj: CNPJ});
            hidden = 'hidden';
        }
        res.render("Fornecedor/cadastrar", {Fornecedor_cnpj, hidden});
}

const cadastrarBD = async (req, res) => {
    const fornecedor = req.body;
    if (fornecedor.id){
        await Forn.findOneAndUpdate({cnpj: fornecedor.cnpj},
        { 
            nomeF: fornecedor.nomeF, 
            emailF: fornecedor.emailF
        });
        console.log('entrei')
        res.redirect("/listarF")
    }else{
        console.log('entrei')
        const verificador_email = await Forn.findOne({emailF: fornecedor.emailF});
        const verificador_cnpj = await Forn.findOne({cnpj: fornecedor.cnpj});
        if(verificador_email || verificador_cnpj){
            res.redirect("/cadastro/Forn");
        } else{
        const novoFornecedor = new Forn({
            nomeF: fornecedor.nomeF,
            emailF: fornecedor.emailF,
            cnpj: fornecedor.cnpj
        });
        await novoFornecedor.save();
        console.log(novoFornecedor)
        res.redirect("/listarF");
        }
    }
};


//Listar
// Cria uma const para procurar os dados que foram colocados no banco de dados, depois renderiza a página indicada, incerindo os dados que foram pegos pela const.
const listar = async (req, res) => {
    const listaF = await Forn.find();
    res.render("Fornecedor/listar", {listaF});
};

//Detalhar
// Mesmo conceito do metódo listar, porém criamos a const CNPJ para requisitar o parametro cnpj do banco, com a const resultadoF verificamos se o cnpj existe no banco.
// Se ele existir é renderizada a pagina de detalhar fornecedores.
const detalhar = async (req, res) => {
    const CNPJ = req.params.cnpj;
    const resultadoF = await Forn.findOne({cnpj: CNPJ});
    res.render('Fornecedor/detalhar', {resultadoF});
};


//Excluir
// Mesmo método do datalharF, porém usamos o findOneAndDelte para excluir ao envez de pegar um dado expecifico.
// Depois o usuário é redirecionado para a lista de fornecedores.
const excluir = async (req, res) => {
    const CNPJ = req.params.cnpj;
    await Forn.findOneAndDelete({cnpj: CNPJ});
    res.redirect("/listarF");
};

module.exports = {cadastrarBD, cadastrar, listar, detalhar, excluir};