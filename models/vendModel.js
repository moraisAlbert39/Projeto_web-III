const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendedorSchema = Schema({

    nomeV: String,
    emailV: String,
    cpf: Number
    
});

module.exports = mongoose.model("Vendedor", vendedorSchema);