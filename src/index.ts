type Turma = "1TADS" | "2TADS" | "3TADS";

interface Aluno {
  id: number;
  nome: string;
  email?: string;
  ativo: boolean;
}

const a1: Aluno = {
  id: 1,
  nome: "Igor",
  ativo: true
};

function matricular(aluno: Aluno, turma: Turma) {
  return `${aluno.nome} matriculado(a) na turma ${turma}`;
}

console.log(matricular(a1, "1TADS"));