import * as readline from "readline";

export function obrigatorio(valor: string, nomeCampo: string): string {
  const v = valor.trim();
  if (v.length === 0) {
    throw new Error(`Campo obrigatório: ${nomeCampo}`);
  }
  return v;
}

export function parseNumeroInteiro(valor: string, nomeCampo: string): number {
  const v = obrigatorio(valor, nomeCampo);
  const n = Number(v);

  if (!Number.isInteger(n)) {
    throw new Error(`"${nomeCampo}" deve ser um número inteiro. Você informou: ${valor}`);
  }

  return n;
}

export function entre(n: number, min: number, max: number, nomeCampo: string): number {
  if (n < min || n > max) {
    throw new Error(`"${nomeCampo}" deve estar entre ${min} e ${max}. Valor: ${n}`);
  }
  return n;
}


async function main() {
  // IO local só para o demo (não afeta quem importa este módulo)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const perguntar = (texto: string): Promise<string> =>
    new Promise((resolve) => rl.question(texto, (resposta: string) => resolve(resposta)));

  try {
    console.log("=== Demo: validators.ts (validação de entrada) ===");

    const nome = obrigatorio(await perguntar("Digite seu nome: "), "nome");

    const idadeStr = await perguntar("Digite sua idade (0–120): ");
    const idade = entre(parseNumeroInteiro(idadeStr, "idade"), 0, 120, "idade");

    console.log("\n✅ Dados válidos!");
    console.log({ nome, idade });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("\n❌ Erro de validação:", msg);
  } finally {
    rl.close();
  }
}


if (require.main === module) {
  main().catch((err) => {
    console.error("Erro inesperado:", err);
    process.exitCode = 1;
  });
}