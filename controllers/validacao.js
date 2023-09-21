//Import Utils:
import util from './utils.js';

function testeNumero(valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor) && valor != 0;
}

function maxMin(txt, limiteMin, limiteMax) {
    if (txt.length < limiteMin || txt.length > limiteMax || txt.length === 0) {
        util.printVermelho(`Erro em quantidade de caracteres (MIN:${limiteMin} MAX: ${limiteMax})`);
        return true;
    } else return false;
}

function maxMinCpf(txt, limiteMin, limiteMax) {
    if (txt.length < limiteMin || txt.length > limiteMax) {
        util.printVermelho(`Erro em quantidade de caracteres (MIN:${limiteMin} MAX: ${limiteMax})`);
        return true;
    } else if (!testeNumero(txt)) {
        util.printVermelho("Erro: O valor digitado não é um número ou é zero.");
        return true;
    } else return false;
}

function apenasLetras(texto) {
    const verificar = /^[a-zA-Z\s]+$/;
    return verificar.test(texto);
}

function tipoSanguineo(tpSanguineo) {
    const tipos = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

    if(tipos.includes(tpSanguineo)) {
        return true;
      } else {
        util.printVermelho(`Erro: ${tpSanguineo} não é um tipo válido.`);
        return false;
      }
}

export default {
    maxMin,
    maxMinCpf,
    apenasLetras,
    tipoSanguineo
}