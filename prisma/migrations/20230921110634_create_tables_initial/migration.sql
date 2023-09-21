-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dt_nascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "tp_sanguineo" TEXT,
    "alergias" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_paciente" TEXT NOT NULL,
    "procedimento" TEXT NOT NULL,
    "medico" TEXT NOT NULL,
    "dt_agendamento" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'agendado',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "agendamentos_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");
