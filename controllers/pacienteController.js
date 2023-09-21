import rl from 'readline-sync';

//Import Banco de Dados:
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

//Import Model Paciente:
import Paciente from '../models/pacienteModel.js';

//Import Validações do Controller:
import validate from './validacao.js';
import agendamentoController from './agendamentoController.js';

//Import Utils:
import util from './utils.js';
import pacienteView from '../views/pacienteView.js';

async function cadastrarAlergias() {
    const alergiaArray = [];

    do {
        let alergia = rl.question("Informe a alergia (Substancia, medicamento, alimentares e afins: ");
        alergiaArray.push(alergia);

        var aux = rl.question("Possui mais alguma alergia [S/N]? ");

    } while (aux.toUpperCase() == "S");

    return alergiaArray;
}

async function cadastrarPaciente() {
    console.clear();

    //Nome:
    let nome = "";
    do {
        nome = rl.question("Digite o nome do paciente: ");
        if (!validate.apenasLetras(nome)) {
            util.printVermelho("Nome deve conter apenas letras.");
        }
    }
    while (validate.maxMin(nome, 1, 50) || !validate.apenasLetras(nome));

    //CPF:
    let cpf = "";
    do cpf = rl.question("Digite o CPF,CNPJ ou Passaporte do paciente (somente numeros): ");
    while (validate.maxMinCpf(cpf, 10, 14));

    //Data de Nascimento:
    let dtNascimento = "";
    do dtNascimento = rl.question("Digite a data de nascimento do paciente DD/MM/YYYY): ");
    while (validate.maxMin(dtNascimento, 10, 10));

    //Telefone/Celular:
    let telefone = "";
    do telefone = rl.question("Digite o numero do telefone/celular com DDD: ");
    while (validate.maxMin(telefone, 11, 12));

    //Email:
    let email = rl.questionEMail("Se desejar, digite o email: ");

    //Tipo Sanguíneo:
    let tpSanguineo = "";
    do tpSanguineo = rl.question("Digite o tipo sanguineo: ");
    while (validate.tipoSanguineo(tpSanguineo) == false);

    //Alergias:
    let alergia = rl.question("Possui alguma alergia [S/N]? ");
    if (alergia.toUpperCase() == "S") {
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

    util.printVerde(`Paciente ${paciente.nome} cadastrado com sucesso!`);

    let contAgendamento = rl.question("Deseja realizar agendamento de consulta/exame [S/N]? ");
    do {
        if (contAgendamento.toUpperCase == "S") {
            await agendamentoController.realizarAgendamento(paciente);
        }
    } while (contAgendamento.toUpperCase != "N")

}

async function buscarPaciente() {
    console.clear()

    console.log(`--- Buscar paciente: ---`);

    let buscaCpf = rl.question("Digite o CPF do paciente que deseja buscar (somente numeros): ")

    const pacienteDB = await db.paciente.findUnique({
        where: {
            cpf: buscaCpf
        }
    });
    if (pacienteDB != undefined) {
        return pacienteDB;

    } else {
        util.printVermelho(`--- Paciente NÃO encontrado ---`)
        console.log(`O que deseja fazer?
        1. Buscar novamente
        2. Voltar
        `);

        let op = rl.questionInt("Digite uma opcao: ");

        if (op == 1) {
            await buscarPaciente();
        } else {
            await pacienteView.mainPaciente();
        }

    }

}

async function editarPaciente() {

    const buscaCpf = rl.question("Digite o CPF do paciente que deseja editar: ");

    const editPaciente = await db.paciente.findUnique({
        where: {
            cpf: buscaCpf
        }
    });

    if (editPaciente != undefined) {
        util.printAmarelo(`Paciente encontrado:
        PACIENTE: ${editPaciente.nome}
        CPF: ${editPaciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
        --------------------------------------
        -- Alteração de dados de pacientes: --
        Qual dado deseja alterar?
        1. Nome
        2. Telefone
        3. Email
        4. Voltar
        `);

        const op = rl.questionInt("Digite uma opcao: ");

        switch (op) {
            case 1:
                let novoNome = rl.question("Digite o novo nome: ");
                await db.paciente.update({
                    where: {
                        cpf: buscaCpf
                    },
                    data: {
                        nome: novoNome
                    }
                });
                break;
            case 2:
                let novoTelefone = rl.question("Digite o novo telefone: ");
                await db.paciente.update({
                    where: {
                        cpf: buscaCpf
                    },
                    data: {
                        telefone: novoTelefone
                    }
                });
                break;
            case 3:
                let novoEmail = rl.question("Digite o novo email: ");
                await db.paciente.update({
                    where: {
                        cpf: buscaCpf
                    },
                    data: {
                        email: novoEmail
                    }
                });
            default:
                await pacienteView.mainPaciente();
                break;
        }
    } else {
        util.printVermelho("Paciente não encontrado");
        await pacienteView.mainPaciente()
    }


}

export default {
    cadastrarPaciente,
    buscarPaciente,
    editarPaciente
}