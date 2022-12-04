const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fornecedorSchema = Schema({

    nomeF: String,
    emailF: String,
    cnpj: Number
    
});

module.exports = mongoose.model("Fonecedor", fornecedorSchema);