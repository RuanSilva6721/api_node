// configuração inicial
require('dotenv').config()
const express =  require('express');
const mongoose = require('mongoose')
const app = express()



//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial / endpoint
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

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