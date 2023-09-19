import readline from 'readline-sync';
import clear from 'clear';

class Paciente {
  constructor(nome, cpf, dtNascimento, consulta) {
    this.nome = nome;
    this.cpf = cpf;
    this.dtNascimento = dtNascimento;
    this.consulta = consulta;
  }
}

function dateFromDB(data) {

  const dataArray = data.split('/');
  const dia = parseInt(dataArray[0]);
  const mes = parseInt(dataArray[1]);
  const ano = parseInt(dataArray[2]);

  const dataNasc = new Date(ano, mes - 1, dia);

  const dataHoje = new Date();

  let idade = dataHoje.getFullYear() - dataNasc.getFullYear();
  const mesAtual = dataHoje.getMonth();
  const mesNasc = dataNasc.getMonth();

  if (mesNasc > mesAtual || (mesNasc === mesAtual && dataNasc.getDate() > dataHoje.getDate())) {
    idade--;
  }

  return [data, idade];
}

class Hospital {
  constructor() {
    this.pacientes = [];
  }

  cadastrarPaciente() {
    console.clear();
    const nome = readline.question("Digite o nome do paciente: ");
    const cpf = readline.question(
      "Digite o CPF do paciente (somente números): "
    );
    const dtNascimento = readline.question("Digite a data de nascimento do paciente (DD/MM/YYYY): ");
    const consulta = readline.question("Digite o tipo da consulta: ");

    const paciente = new Paciente(nome, cpf, dtNascimento, consulta);
    this.pacientes.push(paciente);
  }

  buscarPaciente() {
    console.clear();
    const buscarCpf = readline.question(
      "Digite o CPF do paciente que deseja buscar (somente números): "
    );
    const pacienteEncontrado = this.pacientes.find(
      (paciente) => paciente.cpf === buscarCpf
    );

    if (pacienteEncontrado) {
      console.log(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${dateFromDB(pacienteEncontrado.dtNascimento)[1]} anos (${dateFromDB(pacienteEncontrado.dtNascimento)[0]})
      Consulta: ${pacienteEncontrado.consulta}
      `);
    } else {
      console.clear();
      console.log("Paciente não encontrado");
    }
  }

  alterarPaciente() {
    console.clear();
    const buscarCpf = readline.question(
      "Digite o CPF do paciente que deseja alterar os dados (somente números): "
    );
    const pacienteEncontrado = this.pacientes.find(
      (paciente) => paciente.cpf === buscarCpf
    );

    if (pacienteEncontrado) {
      console.log(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${dateFromDB(pacienteEncontrado.dtNascimento)[1]} anos (${dateFromDB(pacienteEncontrado.dtNascimento)[0]})
      Consulta: ${pacienteEncontrado.consulta}.
      `);
      let continuarAlterando = true;
      while (continuarAlterando) {
        console.log(`O que deseja alterar?
        1. Nome
        2. CPF
        3. Data de Nascimento
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
            const novoCpf = readline.question(
              "Digite o novo CPF do paciente (somente números): "
            );
            pacienteEncontrado.cpf = novoCpf;
            console.clear();
            console.log(`CPF do paciente alterado com sucesso! Novo CPF: ${pacienteEncontrado.cpf}`);
            break;
          case 3:
            const novaDtNasc = readline.question(
              "Digite a nova data de nascimento do paciente: "
            );
            pacienteEncontrado.dtNascimento = novaDtNasc;
            console.clear();
            console.log(`Data de nascimento do paciente alterada com sucesso! Nova data: ${pacienteEncontrado.idade}`);
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
    const buscarCpf = readline.question(
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
        Idade: ${dateFromDB(paciente.dtNascimento)[1]} anos (${dateFromDB(paciente.dtNascimento)[0]})
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
