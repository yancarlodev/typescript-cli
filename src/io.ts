import * as readline from "readline";

let rl: readline.Interface | null = null;

function getRL(): readline.Interface {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
}

export function perguntar(texto: string): Promise<string> {
  return new Promise((resolve) => {
    getRL().question(texto, (resposta: string) => resolve(resposta));
  });
}

export function fecharIO(): void {
  rl?.close();
  rl = null;
}


async function main() {
  try {
    console.log("=== Demo: Entrada de dados (io.ts) ===");
    const nome = (await perguntar("Digite seu nome: ")).trim();
    const idadeStr = (await perguntar("Digite sua idade: ")).trim();

    const idade = Number(idadeStr);
    if (Number.isNaN(idade)) {
      console.log("\nIdade inválida:", idadeStr);
    } else {
      console.log("\nResultado:");
      console.log({ nome: nome || "(vazio)", idade });
    }
  } finally {
    fecharIO();
  }
}

// CommonJS: executa somente se este arquivo for o principal
if (require.main === module) {
  main().catch((err) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Erro:", msg);
    process.exitCode = 1;
  });
}