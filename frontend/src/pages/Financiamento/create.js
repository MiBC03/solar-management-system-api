import React, {useEffect, useState } from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function CreateFinanciamento(){
    const { clienteId } = useParams();
    const [cliente, setCliente] = useState([]);
    let navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    const addFinanciamento = async data => {
        await axios.post("http://localhost:8800/financiamentos/create", data).then((data) => {
        navigate("/financiamentos");
        toast.success(data);
        toast.error(data.sqlMessage);
    }).catch(({data}) => {
        toast.error(data);
    })
}

    const getUmCliente = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/clientes/${clienteId}`);
          setCliente(res.data);
        } catch (error) {
            toast.error(error);
        }
      };
    
      useEffect(() => {
        getUmCliente();
      }, [setCliente]);
    

    return(
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p className='shadow' style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Cadastro de Financiamento </p>
            {cliente.map(cli => (
            <Container fluid key={cli.clt_codigo}>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-2' >    
                <Form className="bg-white shadow p-5 mb-5 d-flex flex-column justify-content-center border-0 rounded-4" onSubmit={handleSubmit(addFinanciamento)} encType='multipart/form-data'>
                            
                    <Row className="d-flex justify-content-center">
                        
                    <Form.Label column="sm" lg={2}> Nome do Cliente </Form.Label>
                        <Col>
                            <p className="text-uppercase"> {cli.clt_nome} </p> 
                        </Col>

                        <Form.Group as={Col} lg={3} hidden>
                            <Form.Label column="sm" >Cliente Codigo</Form.Label>
                            <Form.Control size="sm" type="text" value={clienteId} {...register('fin_clienteCodigo')}/>
                        </Form.Group>
                        
                        <hr></hr>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/ >

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Tipo</Form.Label>
                            <Form.Select size="sm" defaultValue={cli.clt_tipo} disabled>
                                <option value={"PF"}> Pessoa Física</option>
                                <option value={"PJ"}> Pessoa Jurídica</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} width="50%">
                            <Form.Label column="sm">Forma de pagamento</Form.Label>
                            <Form.Select size="sm" {...register('fin_formaPagamento')}>
                                <option value={"BV Financeira"}> Plataforma BV Financeira </option>
                                <option value={"Losango"}> Plataforma Losango </option>
                                <option value={"Santander"}> Plataforma Santander</option>
                            </Form.Select>
                        </Form.Group>

                    </Row>

                    <hr></hr>
                    <h6>DADOS GERAIS</h6>
                    <Row /*className="d-flex justify-content-center"*/ >
                        <Form.Group as={Col} lg={3} sm={5} md={5} >
                            <Form.Label column="sm">CPF</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_CPF} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Nome Completo</Form.Label>
                            <Form.Control size="sm" className="text-uppercase" type="text" defaultValue={cli.clt_nome} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Data de Nascimento</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_dataNasc} disabled/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>INFORMAÇÕES PESSOAIS</h6>
                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Naturalidade/UF</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_estado} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">RG</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_RG} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Celular</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_telefone} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Estado Emissor(RG)</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_orgaoEx} disabled/>
                        </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Data de expedição(RG)</Form.Label>
                            <Form.Control size="sm" type="date" {...register('fin_dataExRG')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Nome da Mãe</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_NomedaMae')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Estado cívil</Form.Label>
                            <Form.Select size="sm" {...register('fin_estadoCivil')}>
                                <option value={"S"}> Solteiro(a) </option>
                                <option value={"C"}> Casado(a) </option>
                                <option value={"SE"}> Separado(a) </option>
                                <option value={"D"}> Divorciado(a) </option>
                                <option value={"V"}> Viúvo(a) </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Patrimônio</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_patrimonio')}/>
                        </Form.Group>
                    </Row>
                    
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Renda Mensal</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_rendaMensal')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Profissão</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_profissao')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">E-mail</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_email} disabled/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">CEP</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_CEP} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">UF</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_estado} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Cidade</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_cidade} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Número</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_numero} disabled/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Bairro</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_bairro} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6}>
                            <Form.Label column="sm">Complemento</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_complemento} disabled/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={6} sm={6} md={6} >
                            <Form.Label column="sm">Situação do Imóvel</Form.Label>
                                <Form.Select size="sm" {...register('fin_situacaoImovel')}>
                                    <option value={"Próprio"}> Próprio </option>
                                    <option value={"Alugado"}> Alugado </option>
                                    <option value={"Cedido"}> Cedido </option>
                                    <option value={"Próprio F"}> Próprio Financiado </option>
                                </Form.Select>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>NATUREZA DA OCUPAÇÃO</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Aposentado ou pensionista" id="Aposentado ou pensionista" {...register('fin_naturezaApo')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Assalariado" id="Assalariado" {...register('fin_naturezaAss')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Autônomo" id="Autônomo" {...register('fin_naturezaAut')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Empresário" id="Empresário" {...register('fin_naturezaEmp')}/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Funcionário público" id="Funcionário público" {...register('fin_naturezaFpub')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Check type="switch" label="Liberal" id="Liberal" {...register('fin_naturezaLib')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>TEMPO DE EMPRESA</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Anos</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_anosEmpresa')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Meses</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_mesesEmpresa')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>REFERÊNCIA BANCÁRIA</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Banco</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_banco')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Agência</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_agencia')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Conta</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_conta')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Nome do Gerente</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_nomeGerente')}/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Cliente desde</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_clienteDesde')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>REFERÊNCIA PESSOAIS</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Nome</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_nomeReferencia')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Telefone</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_telefone} {...register('fin_telefoneReferencia')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>DETALHES DO SISTEMA</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Nº orçamento CRM</Form.Label>
                            <Form.Control size="sm" type="text" disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Fabricante do inversor</Form.Label>
                            <Form.Control size="sm" type="text" disabled />
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Modelo módulo</Form.Label>
                            <Form.Control size="sm" type="text" disabled/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Quantidade de módulos</Form.Label>
                            <Form.Control size="sm" type="text" disabled/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Número da UC do cliente</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_numeroUC')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>DETALHES DO FINANCIAMENTO</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Valor total do sistema</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_valorSistema')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Valor de serviços adicionais(repasse)</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_valorRepasse')}/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Valor da entrada</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_valorEntrada')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Valor da parcela</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_valorParcela')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Quantidade de parcelas</Form.Label>
                            <Form.Control size="sm" type="text" {...register('fin_qtdParcela')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Cârencia</Form.Label>
                                <Form.Select size="sm" {...register('fin_carencia')}>
                                    <option value={"30"}> 30 Dias </option>
                                    <option value={"60"}> 60 Dias </option>
                                    <option value={"90"}> 90 Dias </option>
                                    <option value={"120"}> 120 Dias </option>
                                    <option value={"150"}> 150 Dias</option>
                                    <option value={"180"}> 180 Dias</option>
                                </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={12} sm={6} md={6} >
                            <Form.Label column="sm">Observações</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px' }} {...register('fin_observacoes')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>ANEXAR DOCUMENTOS PESSOAIS / SÓCIO ADMINISTRADOR</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Documento com foto</Form.Label>
                            <Form.Control type="file" name="fin_docComFoto" size="sm" {...register('fin_docComFoto')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Selfie segurando documento com foto (legível)</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Documento com CPF visível</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>
                    </Row>

                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Comprovante de residência</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Comprovante de renda</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Últimas 3 faturas de energia</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <h6>OUTROS DOCUMENTOS QUE PODERÃO SER SOLICITADOS PELA FINANCEIRA</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Cópia do último imposto de renda</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Foto do local de instalação</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Projeto de instalação</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={12} sm={6} md={6} >
                            <Form.Check type="switch" 
                            label="Confirmo que as informações acima são verdadeiras e fico responsável por eventos decorridos por imprecisão das informações acima."/>
                        </Form.Group>
                    </Row>

                    <hr></hr>
                    <div className="mt-3 d-flex justify-content-center">
                        <Button  variant="outline-primary" size="sm" type="submit"> Cadastrar </Button>
                    </div>
        
                </Form>
                </Col>

                </Row>
            </Container>

            ))}
            </div>
            
        </div>
    );
};

export default CreateFinanciamento;