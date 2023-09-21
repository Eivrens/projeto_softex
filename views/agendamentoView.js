import rl from 'readline-sync';

//Import Controllers:
import agendamentoController from '../controllers/agendamentoController.js';
import pacienteController from '../controllers/pacienteController.js';

//Import Utils:
import util from '../controllers/utils.js';

async function mainAgendamento() {
    util.printAmarelo(`--- Gerenciar Agendamentos ---
      Escolha uma opção:
      1. Realizar Agendamentos
      2. Consultar Agendamento
      3. Alterar Agendamento
      4. Cancelar Agendamento
      5. Listar Agendamentos
      6. Sair
      `);

    const op = rl.questionInt("Digite o numero da opcao desejada: ");

    switch (op) {
        case 1:
            const paciente = await pacienteController.buscarPaciente();
            await agendamentoController.realizarAgendamento(paciente);
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6:

            break;
        default:
            break;
    }
}

export default {
    mainAgendamento
}