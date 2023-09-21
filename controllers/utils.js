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

function dateToDB(data, hora) {
    let partesData = data.split('/');

    let dia = partesData[0];
    let mes = partesData[1];
    let ano = partesData[2];

    var data = new Date(ano, mes - 1, dia);

    if (hora != undefined) {
        let partesHora = hora.split(':');
        let hr = partesHora[0];
        let mn = partesHora[1];

        var data = new Date(ano, mes - 1, dia, hr, mn);
    }

    return data.toISOString();
}

function dateFromDB(data) {

    var dataObj = new Date(data);

  let dia = String(dataObj.getDate()).padStart(2, '0');
  let mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  let ano = dataObj.getFullYear();

  const dataFormatada = dia + '/' + mes + '/' + ano;

  const hoje = new Date();

  let idade = hoje.getFullYear() - ano;
  let mesAtual = hoje.getMonth() + 1;

  if (mesAtual < parseInt(mes) || (mesAtual === parseInt(mes) && hoje.getDate() < parseInt(dia))) {
    idade--;
  }

  return  [dataFormatada, idade];
}


export default {
    printAmarelo,
    printVerde,
    printVermelho,
    dateToDB,
    dateFromDB
}