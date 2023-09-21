import readline from 'readline-sync';
import clear from 'clear';

function printAmarelo(texto) {
  console.log('\x1b[33m%s\x1b[0m', texto);
}

function printVerde(texto) {
  console.log('\x1b[32m%s\x1b[0m', texto);
}

function printVermelho(texto) {
  console.error('\x1b[31m%s\x1b[0m', texto);
}

function apenasLetras(texto) {
  const verificar = /^[a-zA-Z\s]+$/;
  return verificar.test(texto);
}

function maxMin(txt, limiteMin, limiteMax){
  if(txt.length < limiteMin || txt.length > limiteMax || txt.length === 0){ 
    printVermelho(`Erro em quantidade de caracteres (MIN:${limiteMin} MAX: ${limiteMax})`);
    return true;
  } else return false;
}

function testeNumero(valor) {
  return !isNaN(parseFloat(valor)) && isFinite(valor) && valor != 0; 
}

function maxMinCpf(txt, limiteMin, limiteMax){
if(txt.length < limiteMin || txt.length > limiteMax){ 
    printVermelho(`Erro em quantidade de caracteres (MIN:${limiteMin} MAX: ${limiteMax})`);
    return true;
  } else if(!testeNumero(txt)) {
    printVermelho("Erro: O valor digitado não é um número ou é zero.");
    return true;
  } else return false;
}

function dateFromDB(data) {

  const dataArray = data.split('-', 3);
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
    let nome = "";
    do {
      nome = readline.question("Digite o nome do paciente: ");
      if(!apenasLetras(nome)) {
        printVermelho("Nome deve conter apenas letras.");
      }
    }
    while(maxMin(nome, 1, 50) || !apenasLetras(nome));

    let cpf = "";
    do cpf = readline.question("Digite o CPF,CNPJ ou Passaporte do paciente (somente números): ");
    while(maxMinCpf(cpf, 10, 14));
    
    let dtNascimento = ""
    do dtNascimento = readline.question("Digite a data de nascimento do paciente (DD/MM/YYYY): ");
    while(maxMin(dtNascimento, 10, 10));

    let consulta = "";
    do {
      consulta = readline.question("Digite o tipo da consulta: ");
      if(!apenasLetras(consulta)) {
        printVermelho("A consulta deve conter apenas letras.");
      }
    }
    while(maxMin(consulta, 2, 50) || !apenasLetras(consulta));

    const paciente = new Paciente(nome, cpf, dtNascimento, consulta);
    this.pacientes.push(paciente);
  }

  buscarPaciente() {
    console.clear();
    const buscarCpf = readline.question(
      "Digite o CPF do paciente que deseja buscar (somente números): "
    );
    const pacienteEncontrado = this.pacientes.find(
      (paciente) => paciente.cpf == buscarCpf
    );

    if (pacienteEncontrado) {
      printVerde(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${dateFromDB(pacienteEncontrado.dtNascimento)[1]} anos (${dateFromDB(pacienteEncontrado.dtNascimento)[0]})
      Consulta: ${pacienteEncontrado.consulta}
      `);
    } else {
      console.clear();
      printVermelho("Paciente não encontrado");
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
      printVerde(`-- Paciente Encontrado --
      Nome: ${pacienteEncontrado.nome}
      CPF: ${pacienteEncontrado.cpf}
      Idade: ${dateFromDB(pacienteEncontrado.dtNascimento)[1]} anos (${dateFromDB(pacienteEncontrado.dtNascimento)[0]})
      Consulta: ${pacienteEncontrado.consulta}.
      `);
      let continuarAlterando = true;
      while (continuarAlterando) {
        printAmarelo(`O que deseja alterar?
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
            let novoNome = "";
            do {
              novoNome = readline.question("Digite o nome do paciente: ");
              if(!apenasLetras(novoNome)) {
                printVermelho("Novo nome deve conter apenas letras.");
              }
            }
            while(maxMin(novoNome, 1, 50) || !apenasLetras(novoNome)){
            pacienteEncontrado.nome = novoNome;
            console.clear();
            printVerde(`Nome do paciente alterado com sucesso! Novo nome: ${pacienteEncontrado.nome}`);
            }
            break;
          case 2:
            let novoCpf = "";
            do novoCpf = readline.question("Digite o novo CPF do paciente (somente números): ");
            while(maxMinCpf(novoCpf, 10, 14)){
            pacienteEncontrado.cpf = novoCpf;
            console.clear();
            printVerde(`CPF do paciente alterado com sucesso! Novo CPF: ${pacienteEncontrado.cpf}`);
            }
            break;
          case 3:
            let novaDtNasc = "";
            do novaDtNasc = readline.question("Digite a nova data de nascimento do paciente: ");
            while(maxMin(dtNascimento, 10, 10)){
            pacienteEncontrado.dtNascimento = novaDtNasc;
            console.clear();
            printVerde(`Data de nascimento do paciente alterada com sucesso! Nova data: ${pacienteEncontrado.idade}`);
            }
            break;
          case 4:
            let novaConsulta = "";
            do {
              novaConsulta = readline.question("Digite a nova consulta do paciente: ");
              if(!apenasLetras(novaConsulta)) {
                printVermelho("A nova consulta deve conter apenas letras.");
              }
            }
            while(maxMin(novaConsulta, 2, 50) || !apenasLetras(novaConsulta)){
            pacienteEncontrado.consulta = novaConsulta;
            console.clear();
            printVerde(`Consulta do paciente alterada com sucesso! Nova consulta: ${pacienteEncontrado.consulta}`);
            }
            break;
          case 5:
            printAmarelo("Alterações finalizadas...");
            this.pausarLimpar();
            continuarAlterando = false;
            break;
          default:
            printVermelho("Opção inválida! Por favor, escolha uma opção válida.");
            this.pausarLimpar();
        }
      }
    } else {
      console.clear();
      printVermelho("Paciente não encontrado");
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
      printVerde(`Paciente ${pacienteRemovido[0].nome} removido com sucesso!`);
      this.pausarLimpar();
    } else {
      console.clear();
      printVermelho("Paciente não encontrado");
      this.pausarLimpar();
    }
  }

  listarPacientes() {
    console.clear();
    if (this.pacientes.length > 0) {
      printAmarelo("Lista de pacientes: ");
      this.pacientes.forEach((paciente) => {
        printVerde(`
        Nome: ${paciente.nome}
        CPF: ${paciente.cpf}
        Idade: ${dateFromDB(paciente.dtNascimento)[1]} anos (${dateFromDB(paciente.dtNascimento)[0]})
        Consulta: ${paciente.consulta}
        `);
      });
    } else {
      printVermelho("Não há pacientes cadastrados");
    }
  }

  pausarLimpar() {
    readline.keyInPause();
    console.clear();
  }

  iniciar() {
    while (true) {
      printAmarelo(`--- Bem-vindo ao Cadastro do Hospital Softex ---
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
          printVerde("Paciente cadastrado com sucesso!");
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
          printAmarelo("Saindo do Cadastro de Hospital...");
          process.exit(0);
        default:
          console.clear();
          printVermelho("Opção inválida! Por favor, escolha uma opção válida.");
          this.pausarLimpar();
      }
    }
  }
}

const hospitalSoftex = new Hospital();
hospitalSoftex.iniciar();
