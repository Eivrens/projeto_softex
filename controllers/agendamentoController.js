import rl from 'readline-sync';

//Import Banco de Dados:
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

//Import Model Agendamento:
import Agendamento from '../models/AgendamentoModel.js';

//Import de Views:
import agendamentoView from '../views/agendamentoView.js';

//Import Utils:
import util from './utils.js';

async function realizarAgendamento(paciente) {
    console.clear();

    console.log(`--- Agendamento de Consulta/Exame: ---
    PACIENTE: ${paciente.nome}
    CPF: ${paciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
    --------------------------------------
    `)

    let procedimento = rl.question("Digite o nome ou codigo do procedimento (Ex.: Cardiologista/consulta): ");

    let nomeMedico = rl.question("Digite o nome do medico responsavel pelo atendimento: ");

    let dtAgendamento = rl.question("Digite a data do agendamento da consulta/exame (DD/MM/YYYY): ");

    let hrAgendamento = rl.question("Digite o horario do atendimento (HH:MM): ");

    console.clear();
    console.log(`--- Agendamento de Consulta/Exame: ---
    PACIENTE: ${paciente.nome}
    CPF: ${paciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
    --------------------------------------
    PROCEDIMENTO: ${procedimento}       MÉDICO: ${nomeMedico}
    DATA: ${dtAgendamento} às ${hrAgendamento}
    --------------------------------------
    `);
    let confirmaAgendamento = rl.question("Confirmar agendamento [S/N]?  ");

    if (confirmaAgendamento.toUpperCase() == "S") {
        const agendamento = new Agendamento(procedimento, nomeMedico, dtAgendamento, hrAgendamento, "agendado");

        const pacienteDB = await db.paciente.findUnique({
            where: {
                cpf: paciente.cpf
            }
        })

        await db.agendamento.create({
            data: {
                id_paciente: pacienteDB.id,
                procedimento: agendamento.procedimento,
                medico: agendamento.medico,
                dt_agendamento: util.dateToDB(dtAgendamento, hrAgendamento),
                status: agendamento.status
            }
        });
        util.printVerde(`Agendamento do(a) paciente ${paciente.nome} realizado com sucesso!`);
    }
    agendamentoView.mainAgendamento()
}

export default {
    realizarAgendamento
}