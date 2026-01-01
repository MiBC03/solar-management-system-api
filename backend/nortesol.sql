-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Dez-2022 às 19:42
-- Versão do servidor: 10.4.25-MariaDB
-- versão do PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `nortesol`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_admin`
--

CREATE TABLE `tb_admin` (
  `adm_codigo` int(11) NOT NULL,
  `adm_nome` varchar(60) NOT NULL,
  `adm_email` varchar(45) NOT NULL,
  `adm_senha` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `clt_codigo` int(11) NOT NULL,
  `clt_nome` varchar(60) NOT NULL,
  `clt_CPF` varchar(14) DEFAULT NULL,
  `clt_imagem` varchar(250) DEFAULT NULL,
  `clt_email` varchar(45) DEFAULT NULL,
  `clt_telefone` varchar(16) DEFAULT NULL,
  `clt_dataNasc` varchar(10) DEFAULT NULL,
  `clt_RG` int(20) DEFAULT NULL,
  `clt_orgaoEx` varchar(8) DEFAULT NULL,
  `clt_CNPJ` varchar(20) DEFAULT NULL,
  `clt_empresa` varchar(80) DEFAULT NULL,
  `clt_tipo` enum('PF','PJ') DEFAULT NULL,
  `clt_estado` varchar(2) NOT NULL,
  `clt_rua` varchar(100) NOT NULL,
  `clt_bairro` varchar(45) NOT NULL,
  `clt_cidade` varchar(80) NOT NULL,
  `clt_CEP` varchar(15) NOT NULL,
  `clt_numero` varchar(10) NOT NULL,
  `clt_complemento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`clt_codigo`, `clt_nome`, `clt_CPF`, `clt_imagem`, `clt_email`, `clt_telefone`, `clt_dataNasc`, `clt_RG`, `clt_orgaoEx`, `clt_CNPJ`, `clt_empresa`, `clt_tipo`, `clt_estado`, `clt_rua`, `clt_bairro`, `clt_cidade`, `clt_CEP`, `clt_numero`, `clt_complemento`) VALUES
(34, 'MARIA LINDALVA DINIZ PINTO', '010203', NULL, 'anakatymar@yahoo.com.br', '(85) 99991-2619', NULL, NULL, NULL, '010203', '', 'PF', '0', '0', '0', '0', '0', '0', '0'),
(35, 'JOHNNATAN UCHÔA LIMA', '151515', NULL, 'johnnatalima2@gmail.com', '(85) 99264-4868', NULL, NULL, NULL, '151515', 'J.U LIMA PANIFICADORA', 'PJ', '0', '0', '0', '0', '0', '0', '0'),
(36, 'GUIOMAR VIEIRA DE MELO', '545454', NULL, 'evaldografica99@gmail.com', '(85) 99294-8100', NULL, NULL, NULL, '545454', '', 'PF', '0', '0', '0', '0', '0', '0', '0'),
(37, 'JOSE MARCIANO DE ANDRADE SILVA', '090909', NULL, 'andrademarciano784@gmail.com', '(85) 99120-6820', NULL, NULL, NULL, '090909', 'MERCADINHO O MARCIANO', 'PJ', '0', '0', '0', '0', '0', '0', '0'),
(79, 'FRANCISCA SABRINE SABINO MENDES', '67678678678668', NULL, 'sabrina@gmail.com', '(85) 9 8223-2211', '22/02/2005', 2001530099, '', '81.818.818/1818-13', 'Rata de academia', 'PF', 'ce', 'n sei', 'n sei', '0cabis', '62700000', '171', 'n sei'),
(163, 'TIAGO BEZERRA HOLANDA', '485.093.485-09', NULL, 'tiago@gmail.com', '(84) 3 5758-943', '', 0, '', '49.809.805/8605-48', 'safado', 'PF', 'CE', 'Romeu Martins', 'Centro', 'Canindé', '62700-000', '2324', 'Casa'),
(164, 'JOÃO MARCOS MOURA BARROSO', '897.987.798-99', NULL, 'jhooow@gmail.com', '(85) 9 8223-229', '22/02/2005', 566754333, '', '79.879.879/8798-79', 'eeep jva', 'PF', 'CE', 'sei la', 'Alto', 'Canindé', '62700-000', '9899', 'Casa'),
(165, 'DAVID TEVIS SANTOS MACIEL', '324.342.342-34', NULL, 'thevez@gmail.com', '(34) 3 2432-423', '08/11/2004', 3243, '', '79.879.879/8798-98', 'repelente de mullher Company', 'PF', 'CE', 'Favela', 'Favela', 'Canindé', '62700-000', '171', 'Favela'),
(166, 'GABRIEL WESLEY ALVES BEZERRA', '485.093.485-04', NULL, 'GW@gmail.com', '(85) 9 8223-229', '2000-02-23', 950968509, 'sspds', '68.768.768/7687-68', 'doente Company', 'PF', 'CE', 'minima ideia', 'alto', 'Canindé', '', '1234', 'favela'),
(168, 'GEOVANNA DE ASSIS VIEIRA', '727.819.101-99', NULL, 'assis@gmail.com', '(63) 7 8191-1018', '2004-12-23', 525166111, '', '37.218.819/1910-10', 'APAE Company', 'PF', 'CE', 'Homero Martins', 'Canindezinho', 'Canindé', '62700-000', '5151', 'cASA'),
(169, 'GEOVANA CASTRO', '485.093.485-03', NULL, 'geovana.castro32@gmail.com', '(85) 9 8223-229', '2003-02-04', 65675765, '', '78.767.867/8687-68', 'soninho', 'PF', 'CE', 'alto', 'alto', 'Canindé', '', '1234', 'alto'),
(170, 'THOMAZ JEFFERSSON', '382.829.190-18', NULL, 'jefferson@gmail.com', '(35) 1 1818-919', '7777-12-23', 72711811, '', '34.516.710/9992-22', 'inimigo da OMS', 'PF', 'CE', 'Jóse Paixão', 'Cã', 'Canindé', '62700-000', '31122', 'APartamento'),
(171, 'JOÃO GABRIEL SAMPAIO', '090.909.090-90', NULL, 'gagas@gmail.com', '(85) 9 8223-2290', '2000-09-09', 2147483647, '', '67.868.768/7687-68', 'gente boa', 'PF', 'CE', 'uma favela', 'joao paluo II', 'Canindé', '', '200', 'favela'),
(172, 'MARIA ISABELA DA SILVA SERPA', '378.291.919-10', NULL, 'isabel@gmail.com', '(85) 9 8223-2298', '2004-10-15', 432616117, '', '35.262.771/8181-91', 'Gráfica gay', 'PF', 'CE', 'Interior', 'Baixa Fria', 'Canindé', '62700-000', '0000', 'Casa'),
(175, 'WESLEY marreiro BRAZ', '453.252.345-34', NULL, 'wesley@gmail.com', '(32) 4 3252-5433', '2004-08-24', 909809809, '', '93.248.932/0480-90', 'traiçoeiro Company', 'PF', 'CE', 'Favela', 'favela', 'Canindé', '', '171', 'favela'),
(176, 'LUIS FABIANo SANTIAGO DA SILVA', '432.432.423-41', NULL, 'fabiano@gmail.com', '(85) 9 8223-2298', '2000-03-12', 2147483647, '', '42.364.283/4628-37', 'Calvos Enterprise', 'PF', 'CE', 'uma favela', 'favela', 'Canindé', '62700-000', '200', 'Favela'),
(177, 'FRANCISCA RAYNARA AGUSTINHO CARDOSO', '904.954.309-54', NULL, 'raynara@gmail.com', '(85) 9 3854-8509', '2004-10-10', 2147483647, 'SSPD', '89.080.980/9800-99', 'Cegas Enterprise', 'PF', 'CE', 'José Paixão', 'Can', 'Canindé', '62700-000', '2169', 'casa'),
(184, 'ALYCE SOUSA SOUSA', '853.223.456-78', NULL, 'alyce@gmail.com', '(85) 9 1213-1488', '2000-03-12', 345612345, 'SSPD', '23.464.212/3456-66', 'Pequenas Empresas Grandes Negócios', 'PJ', 'CE', 'Rua da Escola', 'Escola', 'Canindé', '62700000', '001', 'Prédio'),
(186, 'FRancisco david cosmo', '939.228.101-01', NULL, 'david@gmail.com', '(85) 6 1342-5618', '24/08/2004', 123214, 'SSPDS', '79.879.879/8798-98', 'Genios Company', 'PF', 'CE', 'Um interior', 'Can', 'Canindé', '62700000', '1234', 'Casa');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_financiamento`
--

CREATE TABLE `tb_financiamento` (
  `fin_codigo` int(11) NOT NULL,
  `fin_clienteCodigo` int(11) NOT NULL,
  `fin_formaPagamento` varchar(15) DEFAULT NULL,
  `fin_profissao` varchar(80) DEFAULT NULL,
  `fin_patrimonio` varchar(100) DEFAULT NULL,
  `fin_rendaMensal` varchar(100) DEFAULT NULL,
  `fin_estadoCivil` varchar(100) DEFAULT NULL,
  `fin_NomedaMae` varchar(150) DEFAULT NULL,
  `fin_dataExRG` varchar(10) DEFAULT NULL,
  `fin_situacaoImovel` varchar(20) DEFAULT NULL,
  `fin_naturezaApo` tinyint(1) DEFAULT NULL,
  `fin_naturezaAss` tinyint(1) DEFAULT NULL,
  `fin_naturezaAut` tinyint(1) DEFAULT NULL,
  `fin_naturezaEmp` tinyint(1) DEFAULT NULL,
  `fin_naturezaFpub` tinyint(1) DEFAULT NULL,
  `fin_naturezaLib` tinyint(1) DEFAULT NULL,
  `fin_anosEmpresa` varchar(3) DEFAULT NULL,
  `fin_mesesEmpresa` varchar(2) DEFAULT NULL,
  `fin_banco` varchar(30) DEFAULT NULL,
  `fin_agencia` varchar(10) DEFAULT NULL,
  `fin_conta` varchar(15) DEFAULT NULL,
  `fin_nomeGerente` varchar(150) DEFAULT NULL,
  `fin_clienteDesde` varchar(5) DEFAULT NULL,
  `fin_nomeReferencia` varchar(150) DEFAULT NULL,
  `fin_telefoneReferencia` varchar(15) DEFAULT NULL,
  `fin_numeroUC` varchar(10) DEFAULT NULL,
  `fin_valorSistema` varchar(10) DEFAULT NULL,
  `fin_valorRepasse` varchar(10) DEFAULT NULL,
  `fin_valorEntrada` varchar(10) DEFAULT NULL,
  `fin_valorParcela` varchar(10) DEFAULT NULL,
  `fin_qtdParcela` int(5) DEFAULT NULL,
  `fin_carencia` int(2) DEFAULT NULL,
  `fin_observacoes` varchar(350) DEFAULT NULL,
  `fin_docComFoto` varchar(300) DEFAULT NULL,
  `fin_selfComDocComFoto` varchar(300) DEFAULT NULL,
  `fin_docCPF` varchar(300) DEFAULT NULL,
  `fin_docReseidencia` varchar(300) DEFAULT NULL,
  `fin_conprovanteRenda` varchar(300) DEFAULT NULL,
  `fin_faturaEnergia` varchar(300) DEFAULT NULL,
  `fin_impostoRenda` varchar(300) DEFAULT NULL,
  `fin_localInstalacao` varchar(300) DEFAULT NULL,
  `fin_projetoInstalacao` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_financiamento`
--

INSERT INTO `tb_financiamento` (`fin_codigo`, `fin_clienteCodigo`, `fin_formaPagamento`, `fin_profissao`, `fin_patrimonio`, `fin_rendaMensal`, `fin_estadoCivil`, `fin_NomedaMae`, `fin_dataExRG`, `fin_situacaoImovel`, `fin_naturezaApo`, `fin_naturezaAss`, `fin_naturezaAut`, `fin_naturezaEmp`, `fin_naturezaFpub`, `fin_naturezaLib`, `fin_anosEmpresa`, `fin_mesesEmpresa`, `fin_banco`, `fin_agencia`, `fin_conta`, `fin_nomeGerente`, `fin_clienteDesde`, `fin_nomeReferencia`, `fin_telefoneReferencia`, `fin_numeroUC`, `fin_valorSistema`, `fin_valorRepasse`, `fin_valorEntrada`, `fin_valorParcela`, `fin_qtdParcela`, `fin_carencia`, `fin_observacoes`, `fin_docComFoto`, `fin_selfComDocComFoto`, `fin_docCPF`, `fin_docReseidencia`, `fin_conprovanteRenda`, `fin_faturaEnergia`, `fin_impostoRenda`, `fin_localInstalacao`, `fin_projetoInstalacao`) VALUES
(2, 186, 'BV Financeira', 'PM', '80.000', '6.000', 'C', 'ANTONIA XXXULIANA CRUZZZ', '2030-12-', 'Próprio F', 0, 1, 0, 0, 1, 0, '24', '6', 'Bradesco', '0101', '516290', 'WESLEY CALOTEIRO BRAZZZ', '2022', 'David', '(85) 6 1342-561', '59338', '30.000', '12.000', '15.000', '3.000', 10, 150, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 172, 'BV Financeira', 'Psicóloga', '60.000', '5.000', 'SE', 'ANTONIA XULIANA CRU', '2009-09-09', 'Cedido', 0, 0, 0, 1, 0, 0, '23', '12', 'Bradesco', '0101', '516290', 'ALYCE SOUSA', '2022', 'Isabel', '(85) 98223-4444', '59338', '16.000', '2.000', '3.000', '3.500', 6, 90, 'Observações de fato', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `fun_codigo` int(11) NOT NULL,
  `fun_nome` varchar(60) DEFAULT NULL,
  `fun_email` varchar(45) NOT NULL,
  `fun_senha` varchar(450) NOT NULL,
  `fun_cargo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`fun_codigo`, `fun_nome`, `fun_email`, `fun_senha`, `fun_cargo`) VALUES
(7, 'David', 'david2@gmail.com', '$2b$10$ztQtYvXF7CTQF5.eoCXGFeq.Tmu2mDNZaxkVx1gUwhzXjWv32c2KC', 'programador'),
(8, 'David', 'david3@gmail.com', '$2b$10$w4bj4ibOuEXPQWlHsuUnQesTXlKFZpHOHBkAryugxZMVTKiEmp39O', 'programador'),
(9, 'David12', 'david12@gmail.com', '$2b$10$2fc1o/Z3pcGbCe02GyJVBO5QSklIS2gwboLINZk6/Bu5cy/5b.fiq', 'programador12'),
(11, 'MARIA ISABELA DA SILVA SERPA', 'maria.castro2@gmail.com', '$2b$10$FyVcNvd9ES1o1GrRJMuZV.2EJVdw7vcxkXh9Y3lJu9YF48VUy5MHm', NULL),
(12, 'FRANCISCO DAVID COSMO', 'davidcosmo2078@gmail.com', '$2b$10$An7AqeyTHFaQ8kS0g4LKtuDcv7Fhr69AGpa23ESJIF8994RTbzMt2', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_orcamento`
--

CREATE TABLE `tb_orcamento` (
  `orc_codigo` int(11) NOT NULL,
  `orc_clienteCodigo` int(11) NOT NULL,
  `orc_consumoM` int(4) DEFAULT NULL,
  `orc_tarifa` varchar(100) DEFAULT NULL,
  `orc_tensaoR` varchar(3) DEFAULT NULL,
  `orc_fase` varchar(3) DEFAULT NULL,
  `orc_disponibilidade` int(3) DEFAULT NULL,
  `orc_telhado` varchar(2) DEFAULT NULL,
  `orc_custo` varchar(30) DEFAULT NULL,
  `orc_potencia` varchar(10) DEFAULT NULL,
  `orc_vencimento` varchar(10) DEFAULT NULL,
  `orc_custosEmbutidosMod` tinyint(1) DEFAULT NULL,
  `orc_custosEmbutidosInv` tinyint(1) DEFAULT NULL,
  `orc_custosEmbutidosEst` tinyint(1) DEFAULT NULL,
  `orc_custosEmbutidosTra` tinyint(1) DEFAULT NULL,
  `orc_qtdM` int(3) DEFAULT NULL,
  `orc_avulsoM` varchar(30) DEFAULT NULL,
  `orc_modulo` varchar(400) DEFAULT NULL,
  `orc_qtdI` int(3) DEFAULT NULL,
  `orc_avulsoI` varchar(30) DEFAULT NULL,
  `orc_inversor` varchar(400) DEFAULT NULL,
  `orc_qtdO` int(3) DEFAULT NULL,
  `orc_avulsoO` varchar(30) DEFAULT NULL,
  `orc_otimizador` varchar(400) DEFAULT NULL,
  `orc_qtdC` int(3) DEFAULT NULL,
  `orc_avulsoC` varchar(30) DEFAULT NULL,
  `orc_componente` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_orcamento`
--

INSERT INTO `tb_orcamento` (`orc_codigo`, `orc_clienteCodigo`, `orc_consumoM`, `orc_tarifa`, `orc_tensaoR`, `orc_fase`, `orc_disponibilidade`, `orc_telhado`, `orc_custo`, `orc_potencia`, `orc_vencimento`, `orc_custosEmbutidosMod`, `orc_custosEmbutidosInv`, `orc_custosEmbutidosEst`, `orc_custosEmbutidosTra`, `orc_qtdM`, `orc_avulsoM`, `orc_modulo`, `orc_qtdI`, `orc_avulsoI`, `orc_inversor`, `orc_qtdO`, `orc_avulsoO`, `orc_otimizador`, `orc_qtdC`, `orc_avulsoC`, `orc_componente`) VALUES
(11, 177, 730, '1,05000', '220', 'Mon', 60, 'Z', '16.185,07', '3,5', '2003-12-22', 1, 0, 0, 0, 0, '1', '', 10, '1', '', 0, '0', '', 0, '0', ''),
(12, 177, 600, '1,05000', '220', 'Mon', 30, 'C', '20.988,99', '3,57', '2022-12-03', NULL, NULL, NULL, NULL, 0, '0', '', 0, '0', '', 0, '0', '', 0, '0', ''),
(14, 176, 1000, '2,099', '220', 'Tri', 30, 'S', '30.000', '4,3', '2022-12-04', NULL, NULL, NULL, NULL, 20, '0', 'TRINA SOLAR VERTEX TSM-DE18M II 510', 1, '1', 'SOFAR 3300TL-G3', 0, '0', '', 0, '0', ''),
(20, 186, 1200, '2,0998', '220', 'Bi', 30, 'F', '20.988,99', '4,37', '2012-12-12', 1, 1, 0, 0, 7, '0', 'TRINA SOLAR VERTEX TSM-DE18M II 510', 1, '1', 'SOFAR 3300TL-G3', 0, '0', '', 0, '0', ''),
(22, 184, 1000, '1,05000', '220', 'Mon', 30, 'C', '4.999', '3,66', '2011-11-11', 1, 1, 0, 0, 7, '0', 'TRINA SOLAR VERTEX TSM-DE18M II 510', 1, '0', 'SOFAR 3300TL-G3', 0, '0', '', 0, '0', ''),
(24, 186, 1000, '1,05000', '220', 'Mon', 30, 'C', '16.185,07', '6,66', '2222-02-22', 0, 0, 0, 0, 0, '0', '', 0, '0', '', 0, '0', '', 0, '0', ''),
(25, 175, 1200, '4,5', '127', 'Bi', 30, 'SE', '12.000', '1,5', '2023-08-12', 1, 1, 1, 1, 10, '1', '', 10, '1', '', 10, '1', '', 10, '1', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`adm_codigo`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`clt_codigo`),
  ADD UNIQUE KEY `clt_CPF` (`clt_CPF`),
  ADD UNIQUE KEY `clt_email` (`clt_email`);

--
-- Índices para tabela `tb_financiamento`
--
ALTER TABLE `tb_financiamento`
  ADD PRIMARY KEY (`fin_codigo`);

--
-- Índices para tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`fun_codigo`),
  ADD UNIQUE KEY `fun_email` (`fun_email`);

--
-- Índices para tabela `tb_orcamento`
--
ALTER TABLE `tb_orcamento`
  ADD PRIMARY KEY (`orc_codigo`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_admin`
--
ALTER TABLE `tb_admin`
  MODIFY `adm_codigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `clt_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT de tabela `tb_financiamento`
--
ALTER TABLE `tb_financiamento`
  MODIFY `fin_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `fun_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `tb_orcamento`
--
ALTER TABLE `tb_orcamento`
  MODIFY `orc_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
