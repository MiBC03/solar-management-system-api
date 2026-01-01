import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Table } from 'reactstrap';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlineUserAdd, AiOutlineSearch} from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast, ToastContainer } from "react-toastify"
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Financiamento() { 

    const [financiamentos, setFinanciamentos] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(financiamentos.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = financiamentos.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchFinanciamentos = async () => {
            try {
                const res = await fetch("http://localhost:8800/financiamentos");
                const data = await res.json()
                setFinanciamentos(data)
            } catch(error) {
                console.log(error)
            }   
        };
        fetchFinanciamentos()
     }, [])

     const handleDeleteF = async (fin_codigo) => {
        await axios.delete(`http://localhost:8800/financiamentos/${fin_codigo}`).then(({data}) => {
            setFinanciamentos(financiamentos.filter(financiamento => financiamento.fin_codigo !== fin_codigo ))
            toast.success(data);
        }).catch(({ data }) => toast.error(data));
        
    }

    return(
        <div className='bg-light' style={{height:'100%'}} >
            <div className="shadow-sm"> <Header/> </div>
                
            <div className='fst-italic'>
            <Container>

                <Row className='mt-2'>

                <Col className='col-12'>
                               
                    <div className="shadow p-5 m-5 bg-white border-0 rounded-4">
                        <Row className="pb-3">

                        <h3 className='fw-lighter'>Financiamentos</h3>
                        <hr className="pb-3"></hr>

                        <Col className='col-4 d-flex justify-content-start'>
                                <Form.Group as={Col} lg={4} >
                                <Form.Select title="Escolher o número de clientes amostra" size="sm"  value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </Form.Select>
                            </Form.Group>
                            </Col>

                        </Row>
            
                        <Table size="sm" responsive>
                            <thead>
                            <tr>
                                <th className="">Cliente</th>
                                <th className="">Forma de Pagamento</th>
                                <th className="">Valor</th>
                                <th className="">Parcelas</th>
                                <th className="">Valor Parcela</th>
                                <th className="">Carência</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>
      
                            <tbody>
                            {financiamentos.map(financiamento => (

                            <tr key={financiamento.fin_codigo}>
                                <td className='text-uppercase'>{financiamento.clt_nome}</td>
                                <td>{financiamento.fin_formaPagamento}</td>
                                <td>{financiamento.fin_valorSistema}</td>
                                <td>{financiamento.fin_qtdParcela}</td>
                                <td>{financiamento.fin_valorParcela}</td>
                                <td>{financiamento.fin_carencia}</td>
                                <td>
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}>
                                    <Link to={{ pathname: `edit/${financiamento.fin_codigo}/${financiamento.fin_clienteCodigo}`}}>
                                        <Button title='Botão de Edição das informações do cliente' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                </OverlayTrigger>
                                
                                </td>
                                <td>
                                
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-excluir">Excluir</Tooltip>}>
                                    <Button  title='Botão de Deletar um cliente' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDeleteF(financiamento.fin_codigo)} >
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                </OverlayTrigger>
                                </td>
                            </tr> 
                            ))}
                            </tbody> 
                        </Table>
                        <div className="mt-3 text-center">{Array.from(Array(pages), (item, index) => {
                                    return <Button title='Botão de troca de páginas'
                                    style={ index === currentPage ? {backgroundColor: "#1518b3", border:"0px"} : {backgroundColor: "white", color:"gray" ,border: "1px solid gray"}}
                                    className='rounded-5 m-2 border-0 text-sm mx-2 px-2' 
                                    size="sm"  
                                    value={index} 
                                    onClick={(e) => setCurrentPage(Number(e.target.value))} >{index + 1} 
                                    </Button>
                                   
                        })}</div>

                    </div>
                               
                </Col>
            
            </Row>
            </Container>
            <ToastContainer autoClose={1000} position={toast.POSITION.TOP_RIGHT} />

            </div>
                
        </div>
             
    ); 
};

export default Financiamento;