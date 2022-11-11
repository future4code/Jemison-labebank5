import express, { Request, Response } from "express";
import cors from "cors";
import { clientes, Extrato, Conta } from "./data";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", (req: Request, res: Response) => {
  try {
    const { nome, cpf, nascimento, saldo } = req.body;
    const [{ valor, descricao, data }] = req.body.extrato;
    if (!nome || !cpf || !nascimento) {
      res.statusCode = 404;
      throw new Error(
        "Nenhuma conta encontrada. Insira novamente seus dados corretamente!"
      );
    }
    if (
      typeof nome !== "string" ||
      typeof cpf !== "string" ||
      (typeof nascimento !== "string" && typeof nascimento !== "string")
    ) {
      res.statusCode = 401;
      throw new Error("Erro ao enviar suas informações!");
    }
    clientes.map((user) => {
      if (user.cpf === cpf) {
        res.statusCode = 404;
        throw new Error("CPF já cadastrado!");
      }
    });
    const pegarAnoNascimento = nascimento.split("/")[2];
    const idade = new Date().getFullYear() - Number(pegarAnoNascimento);

    if (idade < 18) {
      res.statusCode = 401;
      throw new Error("Dado inválido. Idade deve ser maior que 18 anos!");
    }

    const NewUser: Conta = {
      nome,
      cpf,
      nascimento,
      saldo,
      extrato: [{ valor, descricao, data }],
    };
    clientes.push(NewUser);
    res.status(201).send("Sua conta foi criada com sucesso!");
  } catch (error: any) {
    res.send(error.message);
  }
});

app.get("/allusers", (req: Request, res: Response) => {
  const allUsers = clientes.map((cliente) => {
    return cliente;
  });

  res.status(200).send(allUsers);
});

app.get("/users/saldo", (req: Request, res: Response) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;

  try {
    if (!nome || !cpf) {
      res.statusCode = 404;
      throw new Error(
        "Nenhuma conta encontrada. Insira novamente seus dados corretamente"
      );
    }

    let saldo;

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].nome != nome || clientes[i].cpf != cpf) {
        res.statusCode = 404;
        throw new Error("Dados incorretos.");
      } else {
        saldo = clientes[i].saldo;

        const mensagem = `Seu saldo é de R$ ${saldo},00`;

        res.status(200).send(saldo);
      }
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

app.put("/users/addsaldo", (req: Request, res: Response) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const saldo = req.body.saldo;

  try {
    if (!nome || !cpf || !saldo) {
      res.statusCode = 404;
      throw new Error(
        "Nenhuma conta encontrada. Insira novamente seus dados corretamente"
      );
    }

    let saldoAntigo: number;
    let novoSaldo: number;
    let clienteAtualizado = [];

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].nome === nome && clientes[i].cpf === cpf) {
        saldoAntigo = clientes[i].saldo;

        novoSaldo = saldoAntigo += saldo;
        clienteAtualizado.push((clientes[i].saldo = novoSaldo));
        res.send(clientes);
      }
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

app.listen(3003, () => {
  console.log("Server is running in http://localhost:3003");
});
