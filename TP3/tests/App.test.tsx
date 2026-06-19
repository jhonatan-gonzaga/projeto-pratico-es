import { fireEvent, render, screen } from "@testing-library/react-native";

import App from "../front-end/src/App";

type RastreabilidadeCase = {
  "caso de teste": string;
  "classes de equivalência": string;
  entradas: {
    telefone: string;
    gmail: string;
    senha: string;
  };
  "resultado esperado": "Válido" | "Inválido";
};

const casosDeTeste: RastreabilidadeCase[] = [
  {
    "caso de teste": "Caso 1",
    "classes de equivalência": "1, 4, 7",
    entradas: {
      telefone: "92999991234",
      gmail: "carlos.lima@gmail.com",
      senha: "Carlos123",
    },
    "resultado esperado": "Válido",
  },
  {
    "caso de teste": "Caso 2",
    "classes de equivalência": "2, 4, 7",
    entradas: {
      telefone: "9299991234",
      gmail: "carlos.lima@gmail.com",
      senha: "Carlos123",
    },
    "resultado esperado": "Inválido",
  },
  {
    "caso de teste": "Caso 3",
    "classes de equivalência": "3, 4, 7",
    entradas: {
      telefone: "929999912345",
      gmail: "carlos.lima@gmail.com",
      senha: "Carlos123",
    },
    "resultado esperado": "Inválido",
  },
  {
    "caso de teste": "Caso 4",
    "classes de equivalência": "1, 5, 7",
    entradas: {
      telefone: "92999991234",
      gmail: "carlos.limagmail.com",
      senha: "Carlos123",
    },
    "resultado esperado": "Inválido",
  },
  {
    "caso de teste": "Caso 5",
    "classes de equivalência": "1, 6, 7",
    entradas: {
      telefone: "92999991234",
      gmail: "carlos.lima@",
      senha: "Carlos123",
    },
    "resultado esperado": "Inválido",
  },
  {
    "caso de teste": "Caso 6",
    "classes de equivalência": "1, 4, 8",
    entradas: {
      telefone: "92999991234",
      gmail: "carlos.lima@gmail.com",
      senha: "Car123",
    },
    "resultado esperado": "Inválido",
  },
  {
    "caso de teste": "Caso 7",
    "classes de equivalência": "1, 4, 9",
    entradas: {
      telefone: "92999991234",
      gmail: "carlos.lima@gmail.com",
      senha: "12345678",
    },
    "resultado esperado": "Inválido",
  },
];

const montarTabelaRastreabilidade = () => {
  const linhas = casosDeTeste.map((caso) => ({
    "caso de teste": caso["caso de teste"],
    "classes de equivalência": caso["classes de equivalência"],
    entradas: `Telefone="${caso.entradas.telefone}"; Gmail="${caso.entradas.gmail}"; Senha="${caso.entradas.senha}"`,
    "resultado esperado": caso["resultado esperado"],
  }));

  const cabecalhos = [
    "caso de teste",
    "classes de equivalência",
    "entradas",
    "resultado esperado",
  ] as const;

  const larguras = cabecalhos.map((cabecalho) =>
    Math.max(
      cabecalho.length,
      ...linhas.map((linha) => String(linha[cabecalho]).length),
    ),
  );

  const formatarLinha = (valores: readonly string[]) =>
    `| ${valores
      .map((valor, index) => valor.padEnd(larguras[index]))
      .join(" | ")} |`;

  return [
    "",
    "Tabela de rastreabilidade #27",
    formatarLinha(cabecalhos),
    formatarLinha(larguras.map((largura) => "-".repeat(largura))),
    ...linhas.map((linha) =>
      formatarLinha(cabecalhos.map((cabecalho) => String(linha[cabecalho]))),
    ),
    "",
  ].join("\n");
};

const tabelaRastreabilidade = montarTabelaRastreabilidade();

const mensagensDeErro = [
  "Digite DDD + numero, com 11 digitos.",
  "Digite um e-mail valido, exemplo: maria@gmail.com.",
  "Use 8 ou mais caracteres com letras e numeros.",
];

const preencherCadastro = (caso: RastreabilidadeCase) => {
  render(<App />);

  fireEvent.press(screen.getByText("Criar conta"));

  const telefoneInput = screen.getByLabelText("Telefone");
  const gmailInput = screen.getByLabelText("Email");
  const senhaInput = screen.getByLabelText("Senha");

  fireEvent.changeText(telefoneInput, caso.entradas.telefone);
  fireEvent(telefoneInput, "blur");

  fireEvent.changeText(gmailInput, caso.entradas.gmail);
  fireEvent(gmailInput, "blur");

  fireEvent.changeText(senhaInput, caso.entradas.senha);
  fireEvent(senhaInput, "blur");
};

describe("Rastreabilidade #27 - validação de acesso por celular, Gmail ou senha", () => {
  beforeAll(() => {
    console.info(tabelaRastreabilidade);
  });

  it("exibe a tabela de casos usada como base", () => {
    expect(tabelaRastreabilidade).toContain(
      "| caso de teste | classes de equivalência | entradas",
    );
    expect(tabelaRastreabilidade).toContain(
      'Telefone="92999991234"; Gmail="carlos.lima@gmail.com"; Senha="Carlos123"',
    );
  });

  test.each(casosDeTeste)(
    "$caso de teste - classes $classes de equivalência - $resultado esperado",
    (caso) => {
      preencherCadastro(caso);

      const possuiErro = mensagensDeErro.some(
        (mensagem) => screen.queryByText(mensagem) !== null,
      );

      if (caso["resultado esperado"] === "Válido") {
        expect(possuiErro).toBe(false);
        return;
      }

      expect(possuiErro).toBe(true);
    },
  );
});
