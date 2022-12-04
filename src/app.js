const express = require('express');
const routerU = require('../router/userRoutes');
const routerF = require('../router/fornRoutes');
const routerV = require('../router/vendRoutes');
const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(routerU);
app.use(routerF);
app.use(routerV);

module.exports = app;
