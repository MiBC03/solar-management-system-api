import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {mask, unMask} from 'remask'
import api from '../../services/api';
import { AiOutlinePlus} from 'react-icons/ai';

function EditCliente() {
    const { clienteId } = useParams();
    let navigate = useNavigate();
    const { register, handleSubmit, setValue} = useForm();

    const attCliente = async data => { 
        await api.put(`/clientes/edit/${clienteId}`, data).then(({data}) => {
            toast.success(data);
            navigate("/clientes");
        }).catch(({data}) => {
            toast.error(data)
        })
    }

    const CheckCEP = (e) => {
        const clt_CEP = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${clt_CEP}/json/`)
        .then(res => res.json()).then(data => {
            console.log(data);
            setValue('clt_estado', data.uf);
            setValue('clt_cidade', data.localidade);
            setValue('clt_complemento', data.complemento);
            setValue('clt_bairro', data.bairro);
        });
        
    };

    const [valueCEP, setValueCEP] = useState("");
    const onChangeCEP = ev => {
        const originalValue = unMask(ev.target.value);
        const maskedValue = mask(originalValue, ["99999-999"]);
        setValueCEP(maskedValue);
    }


    const [cliente, setCliente] = useState([]);

    const getUmCliente = async () => {
    try {
      const res = await api.get(`/clientes/${clienteId}`);
      setCliente(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmCliente();
  }, [setCliente]);

  const [orcamento, setOrcamento] = useState([]);

  const getUmOrcamento = async () => {
  try {
    const res = await api.get(`/orcamentos/${clienteId}`);
    setOrcamento(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
    getUmOrcamento();
}, [setOrcamento]);

const handleDeleteO = async (orc_codigo) => {
    await api.delete(`/orcamentos/${orc_codigo}`).then(({data}) => {
        setOrcamento(orcamento.filter(orc => orc.orc_codigo !== orc_codigo))
        toast.success(data);
    }).catch(({ data }) => toast.error(data));
    
}

const [financiamento, setFinanciamento] = useState([]);

const getUmFinanciamento = async () => {
try {
  const res = await api.get(`/financiamentos/${clienteId}`);
  setFinanciamento(res.data);
} catch (error) {
  console.log(error);
}
};

useEffect(() => {
    getUmFinanciamento();
}, [setFinanciamento]);

const handleDeleteF = async (fin_codigo) => {
  await api.delete(`/financiamentos/${fin_codigo}`).then(({data}) => {
        setFinanciamento(financiamento.filter(fin => fin.fin_codigo !== fin_codigo))
        toast.success(data);
  }).catch(({ data }) => toast.error(data));
  
}

    return (
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p className='shadow' style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Atualização de Clientes </p>
            {cliente.map((cli, index)=> (
                
            <Container fluid key={index}>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-3' > 
               
                <Form className="bg-white shadow p-5 d-flex flex-column justify-content-center border-0 rounded-4" onSubmit={handleSubmit(attCliente)}>
           
                    <Row className="d-flex justify-content-center">
                
                        <Form.Group  as={Col} lg={7} controlId="formNomeCompleto">
                            <Form.Label column="sm" >Nome Completo</Form.Label>
                            <Form.Control className="text-uppercase" size="sm" type="text" defaultValue={cli.clt_nome} {...register('clt_nome')}/>
                        </Form.Group>

                        <Form.Group  as={Col} lg={5} sm={6} md={6} controlId="formGridEmail">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm" type="email" defaultValue={cli.clt_email} {...register('clt_email')} />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group  as={Col} lg={5} sm={6} md={6} controlId="formTelefone">
                            <Form.Label column="sm">Telefone</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_telefone}
                            {...register('clt_telefone')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} width="50%" controlId="formTipo">
                            <Form.Label column="sm">Tipo de cliente</Form.Label>
                            <Form.Select size="sm" defaultValue={cli.clt_tipo} {...register('clt_tipo')}>
                                <option value={"PF"}> Pessoa Física</option>
                                <option value={"PJ"}> Pessoa Jurídica</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formCPF">
                            <Form.Label column="sm">CPF</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_CPF}
                             {...register('clt_CPF')}
                             />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Data de Nascimento</Form.Label>
                            <Form.Control 
                            size="sm" 
                            type="text"
                            defaultValue={cli.clt_dataNasc}
                            {...register('clt_dataNasc')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">RG</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_RG} {...register('clt_RG')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Órgão Expedidor (RG)</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_orgaoEx} {...register('clt_orgaoEx')}/>
                        </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formCNPJ">
                            <Form.Label column="sm">CNPJ</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_CNPJ}
                            {...register('clt_CNPJ')}
                            />
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formEmpresa">
                            <Form.Label column="sm">Empresa</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_empresa} {...register('clt_empresa')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={3} md={3} controlId="formCEP">
                            <Form.Label column="sm" >CEP</Form.Label>
                            <Form.Control size="sm"
                             type="text"
                            defaultValue={cli.clt_CEP}
                            {...register("clt_CEP")}
                            onBlur={CheckCEP}
                            
                            
                            />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={4} md={4} controlId="formEstado">
                            <Form.Label column="sm">Estado</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_estado} {...register('clt_estado')}/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={3} sm={5} md={5} controlId="formCidade">
                            <Form.Label column="sm">Cidade</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_cidade} {...register('clt_cidade')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formBairro">
                            <Form.Label column="sm">Bairro</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_bairro} {...register('clt_bairro')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formRua">
                            <Form.Label column="sm">Rua</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_rua} {...register('clt_rua')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6} controlId="formNumero">
                            <Form.Label column="sm">Número</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_numero} {...register('clt_numero')}/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={8} sm={6} md={6} controlId="formComplemento">
                            <Form.Label column="sm">Complemento</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={cli.clt_complemento} {...register('clt_complemento')}/>
                        </Form.Group>
                    </Row>

                    <div className="mt-3 d-flex justify-content-center">
                        <Button title='Botão de Cadastro de novos usuários'
                                style={{backgroundColor: "white", color:"#1518b3" ,border: "1px solid #1518b3"}}
                                size="sm" type="submit">
                                Atualizar
                                </Button>
                    </div>

                    <Form.Group as={Col} lg={12} sm={12} md={12} size="sm">
                    <Accordion className='mt-3'>

                    <Accordion.Item eventKey="0" className="sm">
                            <Accordion.Header className="sm">Orçamentos</Accordion.Header>
                                <Accordion.Body className='sm'>
                                    
                                    <Col className="d-flex justify-content-end">
                                        <Link to={{ pathname: `../orcamentos/create/${clienteId}`}}>
                                        <Button title='Botão de Cadastro de novos orçamentos'
                                        style={{backgroundColor: "white", color:"#1518b3" ,border: "1px solid #1518b3"}}  
                                        size="sm"><AiOutlinePlus 
                                        className="mb-1 fw-lighter"/>
                                        Cadastar
                                        </Button>
                                        </Link>
                                    </Col>
                                    

                                    <Table size="sm" responsive>
                            <thead>
                            <tr>
                                <th className="">ID</th>
                                <th className="">Valor</th>
                                <th className="">Potência</th>
                                <th className="">Vencimento</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>

                            
                            <tbody>

                            {orcamento.map((orc, index) => (
                            <tr key={index}>
                                <td>{orc.orc_codigo}</td>
                                <td>{orc.orc_custo}</td>
                                <td>{orc.orc_potencia}</td>
                                <td><Badge bg="danger" text="white"> {orc.orc_vencimento} </Badge></td>
                                <td>
                                
                                    <Link to={{ pathname: `../orcamentos/edit/${orc.orc_codigo}`}}>
                                        <Button title='Botão de Edição das informações do orçamento' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                
                                </td>
                                <td>
                                
                                    <Button  title='Botão de Deletar um orçamento' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDeleteO(orc.orc_codigo)}>
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                
                                </td>
                            </tr> 
                            ))}
                            
                            </tbody> 
                            
                        </Table>
                            </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="sm">
                        <Accordion.Header className="sm">Financiamentos</Accordion.Header>
                            <Accordion.Body className='sm'>
                                <Col className="d-flex justify-content-end">
                                <Link to={{ pathname: `../financiamentos/create/${clienteId}`}}>
                                    <Button title='Botão de Cadastro de novos financiamentos'
                                        style={{backgroundColor: "white", color:"#1518b3" ,border: "1px solid #1518b3"}}  
                                        size="sm"><AiOutlinePlus 
                                        className="mb-1 fw-lighter"/>
                                        Cadastar
                                        </Button>
                                </Link>
                                </Col>

                                    <Table size="sm" responsive>
                            <thead>
                            <tr>
                                <th className="">ID</th>
                                <th className="">Forma de Pagamento</th>
                                <th className="">Valor</th>
                                <th className="">Parcelas</th>
                                <th className="">Valor Parcela</th>
                                <th className="">Carência</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>

                            
                            <tbody>

                            {financiamento.map((fin, index) => (
                            <tr key={index}>
                                <td>{fin.fin_codigo}</td>
                                <td>{fin.fin_formaPagamento}</td>
                                <td>{fin.fin_valorSistema}</td>
                                <td>{fin.fin_qtdParcela}</td>
                                <td>{fin.fin_valorParcela}</td>
                                <td>{fin.fin_carencia}</td>
                                <td>
                                
                                    <Link to={{ pathname: `../financiamentos/edit/${fin.fin_codigo}`}}>
                                        <Button title='Botão de Edição das informações do financiamento' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                
                                </td>
                                <td>
                                
                                    <Button  title='Botão de Deletar um orçamento' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDeleteF(fin.fin_codigo)}>
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                
                                </td>
                            </tr> 
                            ))}
                            
                            </tbody> 
                            
                        </Table>
                            </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="sm">
                        <Accordion.Header className="sm">Projetos Elétricos</Accordion.Header>
                            <Accordion.Body className='sm'>
                                <Col className="d-flex justify-content-end">
                                <Link to={{ pathname: `../peletrico/create/${clienteId}`}}>
                                    <Button title='Botão de Cadastro de novos projetos eletricos'
                                        style={{backgroundColor: "white", color:"#1518b3" ,border: "1px solid #1518b3"}}  
                                        size="sm"><AiOutlinePlus 
                                        className="mb-1 fw-lighter"/>
                                        Cadastar
                                        </Button>
                                </Link>
                                </Col>

                                    <Table size="sm" responsive>
                            <thead>
                            <tr>
                                <th className="">ID</th>
                                <th className="">Forma de Pagamento</th>
                                <th className="">Valor</th>
                                <th className="">Parcelas</th>
                                <th className="">Valor Parcela</th>
                                <th className="">Carência</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>

                            
                            <tbody>

                            {financiamento.map((fin, index) => (
                            <tr key={index}>
                                <td>{fin.fin_codigo}</td>
                                <td>{fin.fin_formaPagamento}</td>
                                <td>{fin.fin_valorSistema}</td>
                                <td>{fin.fin_qtdParcela}</td>
                                <td>{fin.fin_valorParcela}</td>
                                <td>{fin.fin_carencia}</td>
                                <td>
                                
                                    <Link to={{ pathname: `../financiamentos/edit/${fin.fin_codigo}`}}>
                                        <Button title='Botão de Edição das informações do financiamento' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                
                                </td>
                                <td>
                                
                                    <Button  title='Botão de Deletar um orçamento' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDeleteF(fin.fin_codigo)}>
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                
                                </td>
                            </tr> 
                            ))}
                            
                            </tbody> 
                            
                        </Table>
                            </Accordion.Body>
                    </Accordion.Item>

                    </Accordion>
                        
                </Form.Group>
                   
        
                </Form>

                </Col>


                </Row>
                
            </Container>
            ))}
            
            </div>
            
        </div>
        
  );
  
};

export default EditCliente;