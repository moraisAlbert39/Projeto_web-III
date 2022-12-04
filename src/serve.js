const app = require('./app');

const auth = require("../middlewares/userAuth");
require('dotenv/config');
const session = require("express-session");

app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));

const mongoose = require('mongoose');
mongoose.connect(process.env.moongo_connect).then(() => console.log('Data base connected')).catch((err) => console.log(err));

app.get ('/', (req, res) => {
    res.render('usuario/login');
});
app.get ('/home', (req, res) => {
    res.render('index');
});

app.listen(process.env.port, () => console.log('server is running'));
