const db = require('../db').pool;

exports.getClientes = (_, res) => {
    const q = "SELECT * FROM tb_cliente";

    db.query(q, (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

exports.getUmCliente = (req, res) => {
  const q = "SELECT * FROM tb_cliente WHERE `clt_codigo` = ?";

  db.query(q, [req.params.id], (err,data) => {
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};

exports.addCliente = (req, res) => {
    const q =
    "INSERT INTO tb_cliente(`clt_nome`, `clt_email`, `clt_telefone`, `clt_CPF`, `clt_dataNasc`, `clt_RG`, `clt_orgaoEx`, `clt_CNPJ`, `clt_empresa`, `clt_tipo`, `clt_estado`, `clt_cidade`, `clt_bairro`, `clt_rua`, `clt_CEP`, `clt_numero`, `clt_complemento`) VALUES(?)";
  
    const values = [
        req.body.clt_nome,
        req.body.clt_email,
        req.body.clt_telefone,
        req.body.clt_CPF,
        req.body.clt_dataNasc,
        req.body.clt_RG,
        req.body.clt_orgaoEx,
        req.body.clt_CNPJ,
        req.body.clt_empresa,
        req.body.clt_tipo,
        req.body.clt_estado,
        req.body.clt_cidade,
        req.body.clt_bairro,
        req.body.clt_rua,
        req.body.clt_CEP,
        req.body.clt_numero,
        req.body.clt_complemento,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente criado com sucesso.");
    });

  };

exports.updateCliente = (req, res) => {
    const q =
    "UPDATE tb_cliente SET `clt_nome` = ?, `clt_email` = ?, `clt_telefone` = ?, `clt_CPF` = ?, `clt_dataNasc` = ?, `clt_RG` = ?, `clt_orgaoEx` = ?, `clt_CNPJ` = ?, `clt_empresa` = ?, `clt_tipo` = ?, `clt_estado` = ?, `clt_cidade` = ?, `clt_bairro` = ?, `clt_rua` = ?, `clt_CEP` = ?, `clt_numero` = ?, `clt_complemento` = ? WHERE `clt_codigo` = ?";
  
    const values = [
      req.body.clt_nome,
      req.body.clt_email,
      req.body.clt_telefone,
      req.body.clt_CPF,
      req.body.clt_dataNasc,
      req.body.clt_RG,
      req.body.clt_orgaoEx,
      req.body.clt_CNPJ,
      req.body.clt_empresa,
      req.body.clt_tipo,
      req.body.clt_estado,
      req.body.clt_cidade,
      req.body.clt_bairro,
      req.body.clt_rua,
      req.body.clt_CEP,
      req.body.clt_numero,
      req.body.clt_complemento,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente atualizado com sucesso.");
    });
  };

exports.deleteCliente = (req, res) => {
    const q = "DELETE FROM tb_cliente WHERE `clt_codigo` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente deletado com sucesso.");
    });
  };
