import rl from 'readline-sync';

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
            pacienteController.cadastrarPaciente();
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
    mainPaciente
}