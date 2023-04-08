// configuração inicial
require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial / endpoint
app.post('/person', async (req, res) =>{
    //req.body
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }
    if(!name){
      res.status(422).json({error: "O nome é obrigatório!"})
    }

    try {

      await Person.create(person)

      res.status(201).json({message:"Pessoa criada com sucesso!!"})
      
    } catch (error) {
      res.status(500).json({error: error})
      
    }

})
app.get('/', (req, res) => {

    res.json({
        message:"oi Express!"
    })
   // console.log(process.env.USER_MONGODB, `${process.env.USER_PASSWORD}`)
})
//entregar um porta

//connect db
const DB_USER = encodeURIComponent(process.env.USER_MONGODB)
const DB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vw9t8la.mongodb.net/?retryWrites=true&w=majority`)
  .then(()  => {
    console.log('Conectando ao Mongo!!')
    app.listen(3000, () => {
      console.log('Servidor Express rodando na porta 3000!')
    })
  })
  .catch((error) => console.log(error))