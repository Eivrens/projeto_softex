import readline from 'readline-sync';
import clear from 'clear';

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

class Paciente {
  constructor(nome, cpf, idade, consulta) {
    this.nome = nome;
    this.cpf = cpf;
    this.idade = idade;
    this.consulta = consulta;
  }
}

function maximo(txt, limite){
  if(txt.length > limite || txt.length == 0){ 
    console.error(`Maximo de caracteres excedidos (MIN: 0) (MAX: ${limite})`);
    return true;
  } else return false;
};

function dateToDB(data) {
  const dataArray = data.split("/", 3);
  return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`
}

function dateFromDB(data) {
  const dataArray = data.split("-", 3);
  const dataFormatada = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`

  //Calcular a idade:
  const dataHoje = new Date();
  const dataNasc = new Date(data);

  const idade = dataHoje.getFullYear() - dataNasc.getFullYear();

  const mesAtual = dataHoje.getMonth();
  const mesNasc = dataNasc.getMonth();

  if (mesNasc > mesAtual || (mesNasc === mesAtual && dataNasc.getDate() > hoje.getDate())) {
    idade--;
  }

  return [dataFormatada, idade];
}

class Hospital {
  constructor() {
    this.pacientes = [];
  }


  async cadastrarPaciente() {
    let nome = "";
    do nome= readline.question("Digite o nome do paciente: ")
    while(maximo(nome, 50));

    let cpf = "";
    do cpf = readline.question("Digite o CPF do paciente: ")
    while(maximo(cpf, 11));

    // let idade = "";
    // do idade = readline.question("Digite a idade do paciente: ")
    // while(maximo(idade, 3));

    let dtNascimento = "";
    do dtNascimento = readline.question("Digite sua data de nascimento (DD/MM/AAAA): ")
    while(maximo(dtNascimento, 10));

    let consulta = "";
    do consulta = readline.question("Digite o tipo de consulta: ");
    while(maximo(consulta, 30))

    // const paciente = new Paciente(nome, cpf, idade, consulta);
    // this.pacientes.push(paciente);
    // console.log("Paciente cadastrado com sucesso!");

    await db.paciente.create({
      data: {
        nome: nome,
        cpf: cpf,
        dt_nascimento: dateToDB(dtNascimento)
      }
    })
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