import readline from 'readline-sync';
import clear from 'clear';

class Paciente {
  constructor(nome, cpf, idade, consulta) {
    this.nome = nome;
    this.cpf = cpf;
    this.idade = idade;
    this.consulta = consulta;
  }
}

class Hospital {
  constructor() {
    this.pacientes = [];
  }

  maximo(txt, limite){
    if(txt.length > limite){ 
      console.error(`Maximo de caracteres exedidos (MIN: 0) (MAX: ${limite})`);
      return true;
    } else return false;
  };

  cadastrarPaciente() {
    let nome = "";
    do nomeo= readline.question("Digite o nome do paciente: ")
    while(maximo(nome, 50));

    let cpf = "";
    do cpf = readline.question("Digite o cpf do paciente: ")
    while(maximo(cpf, 11));

    let idade = "";
    do idade = readline.question("Digite o nome do paciente: ")
    while(maximo(idade, 3));

    let consulta = "";
    do consulta = readline.question("Digite o tipo de consulta: ");
    while(this.maximo(consulta, 30))


    const paciente = new Paciente(nome, cpf, idade, consulta);
    this.pacientes.push(paciente);
    console.log("Paciente cadastrado com sucesso!");
  }

  buscarPaciente() {
    const buscarCpf = readline.questionInt("Digite o CPF do paciente que deseja buscar (somente números): ");
    const pacienteEncontrado = this.pacientes.find((paciente) => paciente.cpf === buscarCpf);

    if (pacienteEncontrado) {
      console.log(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${pacienteEncontrado.idade}
      Consulta: ${pacienteEncontrado.consulta}
      `);
    } else {
      console.log("Paciente não encontrado");
    }
  }

  alterarPaciente() {
    const buscarCpf = readline.questionInt("Digite o CPF do paciente que deseja alterar os dados (somente números): ");
    const pacienteEncontrado = this.pacientes.find((paciente) => paciente.cpf === buscarCpf);

    if (pacienteEncontrado) {
      console.log(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${pacienteEncontrado.idade}
      Consulta: ${pacienteEncontrado.consulta}.
      `);
      let continuarAlterando = true;
      while (continuarAlterando) {
        console.log(`O que deseja alterar?
        1. Nome
        2. CPF
        3. Idade
        4. Consulta
        5. Sair
        `);

        const selecionarOpcao = readline.questionInt("Digite o número da opção que deseja alterar: ");
        switch (selecionarOpcao) {
          case 1:
            const novoNome = readline.question("Digite o novo nome do paciente: ");
            pacienteEncontrado.nome = novoNome;
            console.log("Nome do paciente alterado com sucesso!");
            break;
          case 2:
            const novoCpf = readline.questionInt("Digite o novo CPF do paciente (somente números): ");
            pacienteEncontrado.cpf = novoCpf;
            console.log("CPF do paciente alterado com sucesso!");
            break;
          case 3:
            const novaIdade = readline.questionInt("Digite a nova idade do paciente: ");
            pacienteEncontrado.idade = novaIdade;
            console.log("Idade do paciente alterada com sucesso!");
            break;
          case 4:
            const novaConsulta = readline.question("Digite a nova consulta do paciente: ");
            pacienteEncontrado.consulta = novaConsulta;
            console.log("Consulta do paciente alterada com sucesso!");
            break;
          case 5:
            continuarAlterando = false;
            break;
          default:
            console.log("Opção inválida! Por favor, escolha uma opção válida.");
        }
      }
    } else {
      console.log("Paciente não encontrado");
    }
  }

  removerPaciente() {
    const buscarCpf = readline.questionInt("Digite o CPF do paciente que deseja remover: (somente números) ");
    const pacienteIndex = this.pacientes.findIndex((paciente) => paciente.cpf === buscarCpf);

    if (pacienteIndex !== -1) {
      const pacienteRemovido = this.pacientes.splice(pacienteIndex, 1);
      console.log(`Paciente ${pacienteRemovido[0].nome} removido com sucesso!`);
    } else {
      console.log("Paciente não encontrado");
    }
  }

  listarPacientes() {
    if (this.pacientes.length > 0) {
      console.log("Lista de pacientes: ");
      this.pacientes.forEach((paciente) => {
        console.log(`
        Nome: ${paciente.nome}
        CPF: ${paciente.cpf}
        Idade: ${paciente.idade}
        Consulta: ${paciente.consulta}
        `);
      });
    } else {
      console.log("Não há pacientes cadastrados");
    }
  }

  iniciar() {
    while (true) {
      console.log(`--- Bem-vindo ao Cadastro do Hospital Softex ---
      Escolha uma opção:
      1. Cadastrar paciente
      2. Buscar paciente
      3. Alterar paciente
      4. Remover paciente
      5. Listar pacientes
      6. Sair
      `);

      const opcao = readline.questionInt("Digite o número da opção desejada: ");

      switch (opcao) {
        case 1:
          this.cadastrarPaciente();
          console.clear();
          break;
        case 2:
          this.buscarPaciente();
          console.clear();
          break;
        case 3:
          this.alterarPaciente();
          console.clear();
          break;
        case 4:
          this.removerPaciente();
          console.clear();
          break;
        case 5:
          this.listarPacientes();
          break;
        case 6:
          console.log("Saindo do Cadastro de Hospital...");
          process.exit(0);
        default:
          console.log("Opção inválida! Por favor, escolha uma opção válida.");
      }
    }
  }
}

const hospitalSoftex = new Hospital();
hospitalSoftex.iniciar();