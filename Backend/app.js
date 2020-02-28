const PORTA = 3000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./App/routes/routes"));
app.use(cors());

app.listen(PORTA, () => {
    console.log('Servidor iniciado na porta ' + PORTA);
});