import React, {useEffect, useState } from 'react';
import Header from "../../components/Headers";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Table } from 'reactstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlineUserAdd, AiOutlineSearch} from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import api from '../../services/api';

function Cliente() { 

    const [clientes, setClientes] = useState([]);
    const [busca, setText] = React.useState('');
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(clientes.length / itensPerPage)
    const startIndex = currentPage * itensPerPage; 
    const endIndex = startIndex + itensPerPage;

    const lowerBusca = busca.toString().toLowerCase();
    const currentItens = clientes.filter((cliente) => cliente.clt_nome.toLowerCase().includes(lowerBusca)).slice(startIndex, endIndex);

     useEffect(() => {
        const fetchClientes = async () => { 
            await api.get('/clientes').then((response) => {
                setClientes(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
            }).catch(() => {
            console.log("Deu erro")
            })
        }
        fetchClientes()
        setCurrentPage(0)
    }, [itensPerPage])
    
    const handleDelete = async (clt_codigo) => {
        await api.delete(`/clientes/${clt_codigo}`).then(({data}) => {
            setClientes(clientes.filter(cliente => cliente.clt_codigo !== clt_codigo ))
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
                          
                    <div className=" shadow p-5 m-3 bg-white border-0 rounded-4">
                    
                    <h3 className='fw-lighter'> Clientes </h3>
                        <hr className="pb-3" ></hr>
                        <Row className="pb-3">

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
                        
                            <Col className='col-4 d-flex justify-content-center'>

                                <Form.Group as={Col} lg={12} >
                                    <InputGroup size="sm">
                                    <InputGroup.Text className='rounded-5 rounded-end' id="basic-addon1">
                                        <AiOutlineSearch/>
                                    </InputGroup.Text>
                                        <Form.Control placeholder="Pesquisar" className="rounded-5 rounded-start" aria-label="Pesquisar" aria-describedby="basic-addon1"
                                        onChange={(e) => setText(e.target.value)} value={busca}/>
                                    </InputGroup>
                                    
                                </Form.Group>
                            </Col>

                            <Col className='col-4 d-flex justify-content-end'>
                                <Button title='Botão de Cadastro de novos usuários'
                                style={{backgroundColor: "white", color:"#1518b3" ,border: "1px solid #1518b3"}}
                                href="/clientes/create"  
                                size="sm"><AiOutlineUserAdd 
                                className="mb-1 fw-lighter"/>
                                Cadastro
                                </Button>
                            </Col>
                            
                        </Row>
            
                        <Table size="sm" responsive>
                            <thead>
                            <tr>
                                <th className="">Nome</th>
                                <th className="">Email</th>
                                <th className="">Telefone</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>
      
                            
                            <tbody>

                            {currentItens.map((cliente, index) => (
                            <tr key={index}>
                                <td>
                                    <Link className='text-black text-decoration-none text-uppercase' to={{ pathname: `edit/${cliente.clt_codigo}`}}>
                                    {cliente.clt_nome}
                                    </Link>
                                </td>
                                <td>{cliente.clt_email}</td>
                                <td>{cliente.clt_telefone}</td>
                                <td>
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}>
                                    <Link to={{ pathname: `edit/${cliente.clt_codigo}`}}>
                                        <Button title='Botão de Edição das informações do cliente' variant="outline-success" className="border-0 rounded-5" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                </OverlayTrigger>
                                </td>
                                <td>
                                <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-excluir">Excluir</Tooltip>}>
                                    <Button  title='Botão de Deletar um cliente' variant="outline-danger" className="border-0 rounded-5"  size="sm" onClick={ () => handleDelete(cliente.clt_codigo)} >
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

export default Cliente;