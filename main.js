import rl from 'readline-sync';

//Import Views:
import indexView from './views/index.js';
import pacienteView from './views/pacienteView.js';
import agendamentoView from './views/agendamentoView.js';

indexView.menuInicial();
const op = rl.questionInt("Digite o numero da opcao desejada: ");

switch (op) {
  case 1:
    agendamentoView.mainAgendamento();
    break;
  case 2:
    pacienteView.mainPaciente();
    break;
  default:

    break;
}

