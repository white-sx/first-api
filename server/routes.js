const router = require("express").Router();
const Person = require("./modules/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  if(!name){
      res.status(422).json({error:"nome obrigatório"})
  }
  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(200).json({ message: "Pessoa criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
