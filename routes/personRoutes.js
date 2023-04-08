const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) =>{
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
router.get('/index', (req, res) => {

    res.json({
        message:"oi Express!"
    })
   // console.log(process.env.USER_MONGODB, `${process.env.USER_PASSWORD}`)
})
router.get('/', async (req, res) =>{
    try {
        const people = await Person.find()

        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: error})  
    }
})

module.exports = router