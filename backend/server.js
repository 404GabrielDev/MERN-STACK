import mongoose from "mongoose";
import dotenv from 'dotenv'
import app from "./app.js";

dotenv.config()

const MONGO_URL=process.env.MONGO_URL

export const MDConnect = async () => {

    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'auth'
        }).then(() => {
            console.log("Conectado ao banco de dados")
        })
    } catch (err) {
        console.log("Erro ao se conectar ao banco de dados" + err)
    }

}

const port = process.env.PORT || 3000

MDConnect().then(() => {
    app.listen(port, () => {
        console.log("Server rodando na porta ", + port)
    })
})