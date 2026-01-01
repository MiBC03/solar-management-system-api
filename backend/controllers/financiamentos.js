const db = require('../db').pool;


exports.getFinanciamentos = (_, res) => {
    const q = "SELECT clt_nome, fin_codigo, fin_clienteCodigo, fin_formaPagamento, fin_valorSistema, fin_qtdParcela, fin_valorParcela, fin_carencia FROM tb_financiamento INNER JOIN tb_cliente WHERE fin_clienteCodigo = clt_codigo";

    db.query(q, (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

exports.getUmFinanciamento = (req, res) => {
  const q = "SELECT DISTINCT fin_clienteCodigo, fin_codigo, fin_formaPagamento, fin_profissao, fin_patrimonio, fin_rendaMensal, fin_estadoCivil, fin_NomedaMae, fin_dataExRG, fin_situacaoImovel, fin_naturezaApo, fin_naturezaAss, fin_naturezaAut, fin_naturezaEmp, fin_naturezaFpub, fin_naturezaLib, fin_anosEmpresa, fin_mesesEmpresa, fin_banco, fin_agencia, fin_conta, fin_nomeGerente, fin_clienteDesde, fin_nomeReferencia, fin_telefoneReferencia, fin_numeroUC, fin_valorSistema, fin_valorRepasse, fin_valorEntrada, fin_valorParcela, fin_qtdParcela, fin_carencia, fin_observacoes, fin_docComFoto, fin_selfComDocComFoto, fin_docCPF, fin_docReseidencia, fin_conprovanteRenda, fin_faturaEnergia, fin_impostoRenda, fin_localInstalacao, fin_projetoInstalacao FROM tb_financiamento INNER JOIN tb_cliente WHERE fin_clienteCodigo = ?";

  db.query(q, [req.params.id], (err,data) => {
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};

exports.getUmFinanciamentoEsp = (req, res) => {
  const q = "SELECT * FROM tb_financiamento WHERE fin_codigo = ?";

  db.query(q, [req.params.financiamentoId], (err,data) => {
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};

exports.addFinanciamento = (req, res) => {
    const q =
    "INSERT INTO tb_financiamento(`fin_clienteCodigo`, `fin_formaPagamento`, `fin_profissao`, `fin_patrimonio`, `fin_rendaMensal`, `fin_estadoCivil`, `fin_NomedaMae`, `fin_dataExRG`, `fin_situacaoImovel`, `fin_naturezaApo`, `fin_naturezaAss`, `fin_naturezaAut`, `fin_naturezaEmp`, `fin_naturezaFpub`, `fin_naturezaLib`, `fin_anosEmpresa`, `fin_mesesEmpresa`, `fin_banco`, `fin_agencia`, `fin_conta`, `fin_nomeGerente`, `fin_clienteDesde`, `fin_nomeReferencia`, `fin_telefoneReferencia`, `fin_numeroUC`, `fin_valorSistema`, `fin_valorRepasse`, `fin_valorEntrada`, `fin_valorParcela`, `fin_qtdParcela`, `fin_carencia`, `fin_observacoes`, `fin_docComFoto`) VALUES(?)";

    const values = [
        req.body.fin_clienteCodigo,
        req.body.fin_formaPagamento,
        req.body.fin_profissao,
        req.body.fin_patrimonio,
        req.body.fin_rendaMensal,
        req.body.fin_estadoCivil,
        req.body.fin_NomedaMae,
        req.body.fin_dataExRG,
        req.body.fin_situacaoImovel,
        req.body.fin_naturezaApo,
        req.body.fin_naturezaAss,
        req.body.fin_naturezaAut,
        req.body.fin_naturezaEmp,
        req.body.fin_naturezaFpub,
        req.body.fin_naturezaLib,
        req.body.fin_anosEmpresa,
        req.body.fin_mesesEmpresa,
        req.body.fin_banco,
        req.body.fin_agencia,
        req.body.fin_conta,
        req.body.fin_nomeGerente,
        req.body.fin_clienteDesde,
        req.body.fin_nomeReferencia,
        req.body.fin_telefoneReferencia,
        req.body.fin_numeroUC,
        req.body.fin_valorSistema,
        req.body.fin_valorRepasse,
        req.body.fin_valorEntrada,
        req.body.fin_valorParcela,
        req.body.fin_qtdParcela,
        req.body.fin_carencia,
        req.body.fin_observacoes,
        req.body.fin_docComFoto,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Financimaneto criado com sucesso.");
    });

  };

exports.updateFinanciamento = (req, res) => {
    const q =
    "UPDATE tb_financiamento SET `fin_formaPagamento` = ?, `fin_profissao` = ?, `fin_patrimonio` = ?, `fin_rendaMensal` = ?, `fin_estadoCivil` = ?, `fin_NomedaMae` = ?, `fin_dataExRG` = ?, `fin_situacaoImovel` = ?, `fin_naturezaApo` = ?, `fin_naturezaAss` = ?, `fin_naturezaAut` = ?, `fin_naturezaEmp` = ?, `fin_naturezaFpub` = ?, `fin_naturezaLib` = ?, `fin_anosEmpresa` = ?, `fin_mesesEmpresa` = ?, `fin_banco` = ?, `fin_agencia` = ?, `fin_conta` = ?, `fin_nomeGerente` = ?, `fin_clienteDesde` = ?, `fin_nomeReferencia` = ?, `fin_telefoneReferencia` = ?, `fin_valorSistema` = ?, `fin_valorRepasse` = ?, `fin_valorEntrada` = ?, `fin_valorParcela` = ?, `fin_qtdParcela` = ?, `fin_carencia` = ?, `fin_observacoes` = ?, `fin_docComFoto` = ?, `fin_selfComDocComFoto` = ?, `fin_docCPF` = ?, `fin_docReseidencia` = ?, `fin_conprovanteRenda` = ?, `fin_faturaEnergia` = ?, `fin_impostoRenda` = ?, `fin_localInstalacao` = ?, `fin_projetoInstalacao` = ? WHERE `fin_codigo` = ?";
  
    const values = [
        req.body.fin_formaPagamento,
        req.body.fin_profissao,
        req.body.fin_patrimonio,
        req.body.fin_rendaMensal,
        req.body.fin_estadoCivil,
        req.body.fin_NomedaMae,
        req.body.fin_dataExRG,
        req.body.fin_situacaoImovel,
        req.body.fin_naturezaApo,
        req.body.fin_naturezaAss,
        req.body.fin_naturezaAut,
        req.body.fin_naturezaEmp,
        req.body.fin_naturezaFpub,
        req.body.fin_naturezaLib,
        req.body.fin_anosEmpresa,
        req.body.fin_mesesEmpresa,
        req.body.fin_banco,
        req.body.fin_agencia,
        req.body.fin_conta,
        req.body.fin_nomeGerente,
        req.body.fin_clienteDesde,
        req.body.fin_nomeReferencia,
        req.body.fin_telefoneReferencia,
        req.body.fin_valorSistema,
        req.body.fin_valorRepasse,
        req.body.fin_valorEntrada,
        req.body.fin_valorParcela,
        req.body.fin_qtdParcela,
        req.body.fin_carencia,
        req.body.fin_observacoes,
        req.file.filename,
        req.body.fin_selfComDocComFoto,
        req.body.fin_docCPF,
        req.body.fin_docReseidencia,
        req.body.fin_conprovanteRenda,
        req.body.fin_faturaEnergia,
        req.body.fin_impostoRenda,
        req.body.fin_localInstalacao,
        req.body.fin_projetoInstalacao,
    ];
  
    db.query(q, [...values, req.params.financiamentoId], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Financiamento atualizado com sucesso.");
    });
  };

exports.deleteFinancimaneto = (req, res) => {
    const q = "DELETE FROM tb_financiamento WHERE `fin_codigo` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Financiamento deletado com sucesso.");
    });
  };
