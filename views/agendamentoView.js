//Import Utils:
import util from '../controllers/utils.js';

function mainAgendamento() {
    util.printAmarelo(`--- Gerenciar Agendamentos ---
      Escolha uma opção:
      1. Realizar Agendamentos
      2. Consultar Agendamento
      3. Alterar Agendamento
      4. Cancelar Agendamento
      5. Listar Agendamentos
      6. Sair
      `);
}

export default {
    mainAgendamento
}