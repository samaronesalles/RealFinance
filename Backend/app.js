const PORTA = 3000;

const express = require("express");
const cors = require("cors");
const session = require("express-session")
const bodyParser = require("body-parser");
require('./App/database');

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(session({
    secret: 'real-controle-key',
    saveUninitialized: true,
    rolling: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./App/routes/routes"));


app.listen(PORTA, () => {
    console.log('Servidor iniciado na porta ' + PORTA);
});