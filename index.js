// configuração inicial

const express =  require('express');
const app = express()

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({
        message:"oi Express!"
    })
})

//entregar um porta
app.listen(3000)