'use strict';

function tipoBD_Despesa(tipo) {
    return tipo == 0 ? true : false;
}

function tipoBD_Receita(tipo) {
    return tipo == 1 ? true : false;
}

function RecDespToInt(tipo) {

    if (tipo.toUpperCase().charAt(0) == 'D')
        return 0;

    if (tipo.toUpperCase().charAt(0) == 'R')
        return 1;

    return -1;
}

function IntToRecDesp(tipo) {

    if (tipo == 0)
        return 'Despesa';

    return 'Receita';
}

module.exports = { tipoBD_Despesa, tipoBD_Receita, RecDespToInt, IntToRecDesp };