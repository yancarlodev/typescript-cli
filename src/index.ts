import { fecharIO, perguntar } from "./io";
import { entre, obrigatorio, parseNumeroInteiro, parseTurma } from "./validators";

export type Turma = "1TADS" | "2TADS" | "3TADS";

interface Aluno {
  nome: string;
  idade: number;
  turma: Turma;
}

async function main() {
  try {
    console.log("=== Cadastro de Aluno (CLI) ===");
    const nome = obrigatorio(await perguntar("Digite seu nome: "), "nome");
    
    const idadeStr = await perguntar("Digite sua idade (0–120): ");
    const idade = entre(parseNumeroInteiro(idadeStr, "idade"), 0, 120, "idade");

    const turma = obrigatorio(await perguntar("Digite sua turma: "), "turma");

    const aluno: Aluno = {
      nome: nome,
      idade: idade,
      turma: parseTurma(turma)
    }

    console.log("\nAluno cadastrado com sucesso:");
    console.log(aluno);
  } catch (err: any) {
    const msg = err.message;
    console.error("\nErro:", msg);
  } finally {
    fecharIO();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Erro inesperado:", err);
    process.exitCode = 1;
  });
}