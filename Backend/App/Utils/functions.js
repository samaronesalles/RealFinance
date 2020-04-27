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

// Função necessária, pois não consegui fazer funcionar time zone, e nem usando a moment js funcionou. Então vou só converter a data mesmo e foda-se
function ddmmaaa_aaaammdd(data) {

    const dia = data.substr(0, 2);
    const mes = data.substr(3, 2);
    const ano = data.substr(6, 4);

    return (ano + '-' + mes + '-' + dia);
}

module.exports = { tipoBD_Despesa, tipoBD_Receita, RecDespToInt, IntToRecDesp, ddmmaaa_aaaammdd };