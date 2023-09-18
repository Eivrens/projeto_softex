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

  cadastrarPaciente() {
    console.clear();
    const nome = readline.question("Digite o nome do paciente: ");
    const cpf = readline.questionInt(
      "Digite o CPF do paciente (somente números): "
    );
    const idade = readline.questionInt("Digite a idade do paciente: ");
    const consulta = readline.question("Digite o tipo da consulta: ");

    const paciente = new Paciente(nome, cpf, idade, consulta);
    this.pacientes.push(paciente);
  }

  buscarPaciente() {
    const buscarCpf = readline.questionInt(
      "Digite o CPF do paciente que deseja buscar (somente números): "
    );
    const pacienteEncontrado = this.pacientes.find(
      (paciente) => paciente.cpf === buscarCpf
    );

    if (pacienteEncontrado) {
      console.log(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${pacienteEncontrado.idade}
      Consulta: ${pacienteEncontrado.consulta}
      `);
    } else {
      console.clear();
      console.log("Paciente não encontrado");
    }
  }

  alterarPaciente() {
    console.clear();
    const buscarCpf = readline.questionInt(
      "Digite o CPF do paciente que deseja alterar os dados (somente números): "
    );
    const pacienteEncontrado = this.pacientes.find(
      (paciente) => paciente.cpf === buscarCpf
    );

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

        const selecionarOpcao = readline.questionInt(
          "Digite o número da opção que deseja alterar: "
        );
        console.clear();
        switch (selecionarOpcao) {
          case 1:
            const novoNome = readline.question(
              "Digite o novo nome do paciente: "
            );
            pacienteEncontrado.nome = novoNome;
            console.clear();
            console.log(`Nome do paciente alterado com sucesso! Novo nome: ${pacienteEncontrado.nome}`);
            break;
          case 2:
            const novoCpf = readline.questionInt(
              "Digite o novo CPF do paciente (somente números): "
            );
            pacienteEncontrado.cpf = novoCpf;
            console.clear();
            console.log(`CPF do paciente alterado com sucesso! Novo CPF: ${pacienteEncontrado.cpf}`);
            break;
          case 3:
            const novaIdade = readline.questionInt(
              "Digite a nova idade do paciente: "
            );
            pacienteEncontrado.idade = novaIdade;
            console.clear();
            console.log(`Idade do paciente alterada com sucesso! Nova idade: ${pacienteEncontrado.idade}`);
            break;
          case 4:
            const novaConsulta = readline.question(
              "Digite a nova consulta do paciente: "
            );
            pacienteEncontrado.consulta = novaConsulta;
            console.clear();
            console.log(`Consulta do paciente alterada com sucesso! Nova consulta: ${pacienteEncontrado.consulta}`);
            break;
          case 5:
            console.log("Alterações finalizadas...");
            this.pausarLimpar();
            continuarAlterando = false;
            break;
          default:
            console.log("Opção inválida! Por favor, escolha uma opção válida.");
            this.pausarLimpar();
        }
      }
    } else {
      console.clear();
      console.log("Paciente não encontrado");
      this.pausarLimpar();
    }
  }

  removerPaciente() {
    console.clear();
    const buscarCpf = readline.questionInt(
      "Digite o CPF do paciente que deseja remover: "
    );
    const pacienteIndex = this.pacientes.findIndex(
      (paciente) => paciente.cpf === buscarCpf
    );

    if (pacienteIndex !== -1) {
      const pacienteRemovido = this.pacientes.splice(pacienteIndex, 1);
      console.clear();
      console.log(`Paciente ${pacienteRemovido[0].nome} removido com sucesso!`);
      this.pausarLimpar();
    } else {
      console.clear();
      console.log("Paciente não encontrado");
      this.pausarLimpar();
    }
  }

  listarPacientes() {
    console.clear();
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

  pausarLimpar() {
    readline.keyInPause();
    console.clear();
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
          console.log("Paciente cadastrado com sucesso!");
          this.pausarLimpar();
          break;
        case 2:
          this.buscarPaciente();
          this.pausarLimpar();
          break;
        case 3:
          this.alterarPaciente();
          break;
        case 4:
          this.removerPaciente();
          break;
        case 5:
          this.listarPacientes();
          this.pausarLimpar();
          break;
        case 6:
          console.clear();
          console.log("Saindo do Cadastro de Hospital...");
          process.exit(0);
        default:
          console.clear();
          console.log("Opção inválida! Por favor, escolha uma opção válida.");
          this.pausarLimpar();
      }
    }
  }
}

const hospitalSoftex = new Hospital();
hospitalSoftex.iniciar();
