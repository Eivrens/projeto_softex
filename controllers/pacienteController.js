import rl from 'readline-sync';

//Import Banco de Dados:
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

//Import Model Paciente:
import Paciente from '../models/pacienteModel.js';

//Import Validações do Controller:
import validate from '../controllers/validacao.js';

//Import Utils:
import util from './utils.js';

async function cadastrarAlergias() {
    const alergiaArray = [];

    do {
        let alergia = rl.question("Informe a alergia (Substancia, medicamento, alimentares e afins: ");
        alergiaArray.push(alergia);

        var aux = rl.question("Possui mais alguma alergia [S/N]? ");
        
    } while(aux.toUpperCase() == "S");
    
    return alergiaArray;
}

async function cadastrarPaciente() {
    console.clear();

    //Nome:
    let nome = "";
    do {
      nome = rl.question("Digite o nome do paciente: ");
      if(!validate.apenasLetras(nome)) {
        util.printVermelho("Nome deve conter apenas letras.");
      }
    }
    while(validate.maxMin(nome, 1, 50) || !validate.apenasLetras(nome));

    //CPF:
    let cpf = "";
    do cpf = rl.question("Digite o CPF,CNPJ ou Passaporte do paciente (somente numeros): ");
    while(validate.maxMinCpf(cpf, 10, 14));
    
    //Data de Nascimento:
    let dtNascimento = "";
    do dtNascimento = rl.question("Digite a data de nascimento do paciente DD/MM/YYYY): ");
    while(validate.maxMin(dtNascimento, 10, 10));

    //Telefone/Celular:
    let telefone = "";
    do telefone = rl.question("Digite o numero do telefone/celular com DDD: ");
    while(validate.maxMin(telefone, 11, 12));

    //Email:
    let email = rl.questionEMail("Se desejar, digite o email: ");

    //Tipo Sanguíneo:
    let tpSanguineo = "";
    do tpSanguineo = rl.question("Digite o tipo sanguineo: ");
    while(validate.tipoSanguineo(tpSanguineo) == false);

    //Alergias:
    let alergia = rl.question("Possui alguma alergia [S/N]? ");
    if(alergia.toUpperCase() == "S") {
        await cadastrarAlergias()
    }

    const paciente = new Paciente(nome, cpf, dtNascimento, telefone, email, tpSanguineo.toUpperCase(), cadastrarAlergias.toString());

    await db.paciente.create({
        data: {
            nome: paciente.nome,
            cpf: paciente.cpf,
            dt_nascimento: util.dateToDB(paciente.dtNascimento),
            telefone: paciente.telefone,
            email: paciente.email,
            tp_sanguineo: paciente.tpSanguineo,
            alergias: paciente.alergias
        }
    });

    util.printVerde(`Paciente ${paciente.nome} cadastrado com sucesso!
    Deseja realizar agendamento de consulta?`);
}

export default {
    cadastrarPaciente
}