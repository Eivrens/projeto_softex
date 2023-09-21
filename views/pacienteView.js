import rl from 'readline-sync';

//Import Index/Tela Inicial:
import index from '../views/index.js';

//Import Controllers:
import pacienteController from '../controllers/pacienteController.js';

//Import Utils:
import util from '../controllers/utils.js';

async function mainPaciente() {
    console.clear();

    util.printAmarelo(`--- Gerenciar Pacientes ---
      Escolha uma opção:
      1. Cadastrar paciente
      2. Buscar paciente
      3. Alterar paciente
      4. Remover paciente
      5. Listar pacientes
      6. Voltar
      7. Sair
      `);

    const op = rl.questionInt("Digite o numero da opcao desejada: ");

    switch (op) {
        case 1:
            await pacienteController.cadastrarPaciente();
            break;
        case 2:
            const paciente = await pacienteController.buscarPaciente();

            if (paciente != undefined) {
                await exibirPaciente(paciente);
            }

            break;
        case 3:
            await pacienteController.editarPaciente();

            break;
        case 4:
            await pacienteController.deletarPaciente();
            break;
        case 5:
            await pacienteController.listarPacientes();
            rl.keyInPause();
            mainPaciente();
            break;
        case 6:
            await mainPaciente()
            break;
        default:
            break;
    }
}

async function exibirPaciente(paciente) {
    console.clear();

    util.printVerde(`--- Paciente Encontrado! ---`);
    util.printVerde(`--- Dados do Paciente: ---
    NOME: ${paciente.nome}
    CPF: ${paciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
    DATA DE NASCIMENTO: ${util.dateFromDB(paciente.dt_nascimento)[0]}       IDADE: ${util.dateFromDB(paciente.dt_nascimento)[1]}
    TELEFONE: ${paciente.telefone}      EMAIL: ${paciente.email}
    TIPO SANGUÍNEO: ${paciente.tp_sanguineo}
    ALERGIAS: ${paciente.alergias}
    `);
}

export default {
    mainPaciente
}