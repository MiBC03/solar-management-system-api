const db = require('../db').pool
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.addFuncionario = (req, res) => {
    const fun_senha = req.body.fun_senha;

    bcrypt.hash(fun_senha, saltRounds, (err, hash) => {
      
      if(err) {
        console.log(err)
      }

    const q =
    "INSERT INTO tb_funcionario(`fun_nome`, `fun_email`, `fun_senha`) VALUES(?)";
  
    const values = [
        req.body.fun_nome,
        req.body.fun_email,
        hash,
    ];

    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Funcionário criado com sucesso.");
    });

    })
  };

