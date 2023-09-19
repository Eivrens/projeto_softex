-- CreateTable
CREATE TABLE "pacientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dt_nascimento" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_paciente" INTEGER NOT NULL,
    "dt_agendamento" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'agendado',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "consultas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");
