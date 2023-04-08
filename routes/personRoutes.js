const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  //req.body
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };
  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório!" });
    return;
  }

  try {
    await Person.create(person);

    res.status(201).json({ message: "Pessoa criada com sucesso!!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/index", (req, res) => {
  res.json({
    message: "oi Express!",
  });
  // console.log(process.env.USER_MONGODB, `${process.env.USER_PASSWORD}`)
});
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ error: "Usuário não encontrado!!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, salary, approved } = req.body;

    const personUpdate = {
      name,
      salary,
      approved,
    };
    const person = await Person.updateOne({ _id: id }, personUpdate);

    if (person.matchedCount === 0) {
      res.status(422).json({ error: "Usuário não encontrado!!" });
      return;
    }

    res.status(200).json(personUpdate);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ error: "Usuário não encontrado!!" });
    return;
  }

  try {
    const personDelete = await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
