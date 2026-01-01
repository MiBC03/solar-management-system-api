const db = require('../db').pool;

exports.getOrcamento = (_, res) => {
    const q = "SELECT orc_codigo, orc_clienteCodigo, clt_nome, orc_custo, orc_potencia, orc_vencimento FROM tb_orcamento INNER JOIN tb_cliente WHERE orc_clienteCodigo = clt_codigo";

    db.query(q, (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

exports.getUmOrcamento = (req, res) => {
  const q = "SELECT DISTINCT orc_codigo, orc_clienteCodigo, orc_consumoM, orc_tarifa, orc_custo, orc_tensaoR, orc_potencia, orc_fase, orc_disponibilidade, orc_telhado, orc_custo, orc_potencia, orc_vencimento, orc_custosEmbutidosMod, orc_custosEmbutidosInv, orc_custosEmbutidosEst, orc_custosEmbutidosTra, orc_qtdM, orc_avulsoM, orc_modulo, orc_qtdI, orc_avulsoI, orc_inversor, orc_qtdO, orc_avulsoO, orc_otimizador, orc_qtdC, orc_avulsoC, orc_componente FROM tb_orcamento INNER JOIN tb_cliente WHERE orc_clienteCodigo = ?";

  db.query(q, [req.params.id], (err,data) => {
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};

exports.getUmOrcamentoEsp = (req, res) => {
  const q = "SELECT orc_codigo, orc_clienteCodigo, orc_consumoM, orc_tarifa, orc_custo, orc_tensaoR, orc_potencia, orc_fase, orc_disponibilidade, orc_telhado, orc_custo, orc_potencia, orc_vencimento, orc_custosEmbutidosMod, orc_custosEmbutidosInv, orc_custosEmbutidosEst, orc_custosEmbutidosTra, orc_qtdM, orc_avulsoM, orc_modulo, orc_qtdI, orc_avulsoI, orc_inversor, orc_qtdO, orc_avulsoO, orc_otimizador, orc_qtdC, orc_avulsoC, orc_componente FROM tb_orcamento WHERE orc_codigo = ?";

  db.query(q, [req.params.orcamentoId], (err,data) => {
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};

exports.addOrcamento = (req, res) => {
    const q =
    "INSERT INTO tb_orcamento(`orc_clienteCodigo`, `orc_consumoM`, `orc_tarifa`, `orc_tensaoR`, `orc_fase`, `orc_disponibilidade`, `orc_telhado`, `orc_custo`, `orc_potencia`, `orc_vencimento`, `orc_custosEmbutidosMod`, `orc_custosEmbutidosInv`, `orc_custosEmbutidosEst`, `orc_custosEmbutidosTra`, `orc_qtdM`, `orc_avulsoM`, `orc_modulo`, `orc_qtdI`, `orc_avulsoI`, `orc_inversor`, `orc_qtdO`, `orc_avulsoO`, `orc_otimizador`, `orc_qtdC`, `orc_avulsoC`, `orc_componente`) VALUES(?)"
  
    const values = [
        req.body.orc_clienteCodigo,
        req.body.orc_consumoM,
        req.body.orc_tarifa,
        req.body.orc_tensaoR,
        req.body.orc_fase,
        req.body.orc_disponibilidade,
        req.body.orc_telhado,
        req.body.orc_custo,
        req.body.orc_potencia,
        req.body.orc_vencimento,
        req.body.orc_custosEmbutidosMod,
        req.body.orc_custosEmbutidosInv,
        req.body.orc_custosEmbutidosEst,
        req.body.orc_custosEmbutidosTra,
        req.body.orc_qtdM,
        req.body.orc_avulsoM,
        req.body.orc_modulo,
        req.body.orc_qtdI,
        req.body.orc_avulsoI,
        req.body.orc_inversor,
        req.body.orc_qtdO,
        req.body.orc_avulsoO,
        req.body.orc_otimizador,
        req.body.orc_qtdC,
        req.body.orc_avulsoC,
        req.body.orc_componente,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Orçamento criado com sucesso.");
    });

  };

exports.updateOrcamento = (req, res) => {
    const q = "UPDATE tb_orcamento SET `orc_consumoM` = ?, `orc_tarifa` = ?, `orc_tensaoR` = ?, `orc_fase` = ?, `orc_disponibilidade` = ?, `orc_telhado` = ?, `orc_custo` = ?, `orc_potencia` = ?, `orc_vencimento` = ?, `orc_custosEmbutidosMod` = ?, `orc_custosEmbutidosInv` = ?, `orc_custosEmbutidosEst` = ?, `orc_custosEmbutidosTra` = ?, `orc_qtdM` = ?, `orc_avulsoM` = ?, `orc_modulo` = ?, `orc_qtdI` = ?, `orc_avulsoI` = ?, `orc_inversor` = ?, `orc_qtdO` = ?, `orc_avulsoO` = ?, `orc_otimizador` = ?, `orc_qtdC` = ?, `orc_avulsoC` = ?, `orc_componente` = ? WHERE `orc_codigo` = ?";
  
    const values = [
        req.body.orc_consumoM,
        req.body.orc_tarifa,
        req.body.orc_tensaoR,
        req.body.orc_fase,
        req.body.orc_disponibilidade,
        req.body.orc_telhado,
        req.body.orc_custo,
        req.body.orc_potencia,
        req.body.orc_vencimento,
        req.body.orc_custosEmbutidosMod,
        req.body.orc_custosEmbutidosInv,
        req.body.orc_custosEmbutidosEst,
        req.body.orc_custosEmbutidosTra,
        req.body.orc_qtdM,
        req.body.orc_avulsoM,
        req.body.orc_modulo,
        req.body.orc_qtdI,
        req.body.orc_avulsoI,
        req.body.orc_inversor,
        req.body.orc_qtdO,
        req.body.orc_avulsoO,
        req.body.orc_otimizador,
        req.body.orc_qtdC,
        req.body.orc_avulsoC,
        req.body.orc_componente,
    ];
  
    db.query(q, [...values, req.params.orcamentoId], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Orçamento atualizado com sucesso.");
    });
  };

exports.deleteOrcamento = (req, res) => {
    const q = "DELETE FROM tb_orcamento WHERE `orc_codigo` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Orçamento deletado com sucesso.");
    });
  };
