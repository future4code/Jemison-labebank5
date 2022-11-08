export type Conta = {
    nome: string,
    cpf: string,
    nascimento: string 
    saldo: number,
    extrato: Extrato[]

}

export type Extrato = {
    valor: number,
    data: string 
    descricao: string,
}

export const clientes: Conta[] = [{
    nome: "",
    cpf: "111111111-11",
    nascimento: "",
    saldo: 300,
    extrato:[
        {
            valor:100,
            descricao:"",
            data:""
        }
    ]
},
{
    nome: "",
    cpf: "222222222-22",
    nascimento: "",
    saldo: 400,
    extrato:[
        {
            valor:200,
            descricao:"",
            data:""
        }
    ]
   
},
{
    nome: "",
    cpf: "333.333.333-33",
    nascimento: "",
    saldo: 500,
    extrato:[
        {
            valor: 300,
            descricao:"",
            data:""
        }
    ]
}]



























