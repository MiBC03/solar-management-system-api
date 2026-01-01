import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Container, Row, Col, Table } from 'reactstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast, ToastContainer } from "react-toastify"
import { AiOutlineUserAdd, AiOutlineSearch} from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import api from '../../services/api';

function Orcamento(){

    const [orcamentos, setOrcamento] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(orcamentos.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = orcamentos.slice(startIndex, endIndex);

     useEffect(() => {
        const fetchOrcamento = async () => { 
            await api.get('/orcamentos').then((response) => {
                setOrcamento(response.data);
            }).catch(() => {
            console.log("Deu erro")
            })
        }
        fetchOrcamento()
        setCurrentPage(0)
    }, [itensPerPage])

    const handleDeleteO = async (orc_codigo) => {
        await api.delete(`/orcamentos/${orc_codigo}`).then(({data}) => {
            setOrcamento(orcamentos.filter(orcamento => orcamento.orc_codigo !== orc_codigo ))
            toast.success(data);
        }).catch(({ data }) => toast.error(data));
        
    }

    return(
        <div className='bg-light' style={{height:'100vh'}} >
            <div className="shadow-sm"> <Header/> </div>
                
            <div className='fst-italic'>
            <Container>

                <Row className='mt-2'>

                <Col className='col-12'>
                               
                    <div className=" shadow p-5 m-3 bg-white border-0 rounded-4">
                        <Row className="pb-3">

                        <h3 className='fw-lighter fst-italic'>Orçamentos</h3>
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
                                <th className="">ID</th>
                                <th className="">Cliente</th>
                                <th className="">Valor</th>
                                <th className="">Potência</th>
                                <th className="">Vencimento</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>

                            {currentItens.map(orcamento => (
                            <tbody>

                            <tr key={orcamento.codigo}>
                                <td>{orcamento.orc_codigo}</td>
                                <td className="text-uppercase">{orcamento.clt_nome}</td>
                                <td>{orcamento.orc_custo}</td>
                                <td>{orcamento.orc_potencia}</td>
                                <td><Badge bg="danger" text="white">  {orcamento.orc_vencimento} </Badge></td>
                                <td>
                                
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}>
                                    <Link to={{ pathname: `edit/${orcamento.orc_codigo}`}}>
                                        <Button title='Botão de Edição das informações do cliente' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                </OverlayTrigger>
                                
                                </td>
                                <td>
                                
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-excluir">Excluir</Tooltip>}>
                                    <Button  title='Botão de Deletar um cliente' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDeleteO(orcamento.orc_codigo)} >
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                </OverlayTrigger>
                                
                                </td>
                            </tr> 
                            
                            </tbody> 
                            ))}
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

export default Orcamento;