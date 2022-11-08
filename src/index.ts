import express, {Request, Response} from "express"
import cors from 'cors'
import { clientes, Extrato, Conta } from './data'

const app = express()
app.use(express.json())
app.use(cors())


app.post("/users", (req: Request, res: Response)=>{
    try{
        const {nome, cpf, nascimento} = req.body

        if(!nome || !cpf || !nascimento){
            res.statusCode = 404
            throw new Error("Nenhuma conta encontrada. Insira novamente seus dados corretamente!")
        }
        if(typeof nome !== "string" || typeof cpf !== "string" || typeof nascimento !== "string" && typeof nascimento !== "string"){
            res.statusCode = 401
            throw new Error("Erro ao enviar suas informações!")
        }
        clientes.map(user => {
            if(user.cpf === cpf){
                res.statusCode = 404
                throw new Error("CPF já cadastrado!")
            }
        })
        const pegarAnoNascimento = nascimento.split("/")[2]
        const idade = new Date().getFullYear() - Number(pegarAnoNascimento)

        if(idade < 18){
            res.statusCode = 401
            throw new Error("Dado inválido. Idade deve ser maior que 18 anos!")
        }

        const NewUser: Conta ={ 
            nome,
            cpf,
            nascimento,
            saldo: 0,
            extrato: []
        }
        clientes.push(NewUser)
        res.status(201).send("Sua conta foi criada com sucesso!")
    }catch(error: any){
        res.send(error.message)
    }
})






app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});