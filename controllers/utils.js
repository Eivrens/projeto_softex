//Funções de estilização de cores:
function printAmarelo(texto) {
    console.log('\x1b[33m%s\x1b[0m', texto);
}

function printVerde(texto) {
    console.log('\x1b[32m%s\x1b[0m', texto);
}

function printVermelho(texto) {
    console.error('\x1b[31m%s\x1b[0m', texto);
}

function dateToDB(data) {
    let partesData = data.split('/');

    let dia = partesData[0];
    let mes = partesData[1];
    let ano = partesData[2];

    var data = new Date(ano, mes - 1, dia);

    return data.toISOString();
}

export default {
    printAmarelo,
    printVerde,
    printVermelho,
    dateToDB
}