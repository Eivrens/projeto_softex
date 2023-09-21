//Import Utils:
import util from '../controllers/utils.js';

function menuInicial() {
    console.clear();
    
    util.printAmarelo(`--- Bem-vindo ao Hospital Softex ---
      Escolha uma opção:
      1. Agendamento de Consultas/Exames
      2. Gerenciar Pacientes
      3. Sair
      `);
}

export default {
    menuInicial
}