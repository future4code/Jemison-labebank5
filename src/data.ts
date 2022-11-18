export type Conta = {
  id: number | string;
  nome: string;
  cpf: string;
  nascimento: string;
  saldo: number;
  extrato: Extrato[];
};

export type Extrato = {
  valor: number;
  data: string;
  descricao: string;
};

export const clientes: Conta[] = [
  {
    id: 1,
    nome: "Teste1",
    cpf: "111111111-11",
    nascimento: "",
    saldo: 300,
    extrato: [
      {
        valor: 100,
        descricao: "",
        data: "",
      },
    ],
  },
  {
    id: 2,
    nome: "Teste2",
    cpf: "222222222-22",
    nascimento: "",
    saldo: 400,
    extrato: [
      {
        valor: 200,
        descricao: "Conta de água",
        data: "08/11/2022",
      },
    ],
  },
  {
    id: 3,
    nome: "Teste3",
    cpf: "333.333.333-33",
    nascimento: "",
    saldo: 500,
    extrato: [
      {
        valor: 300,
        descricao: "",
        data: "",
      },
    ],
  },
];
