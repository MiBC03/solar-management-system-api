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

function Obra(){
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/clientes')
        .then((response) => {
            setClientes(response.data.response.clientes);
        })
        .catch(() => {
            console.log("Deu erro")
        })

    }, [])

    function deleteObra(clt_codigo) {
        axios.delete(`http://localhost:3030/clientes/${clt_codigo}`)
        setClientes(clientes.filter(cliente => cliente.id !== clt_codigo ))
    }

    return(
        <div className='bg-light' style={{height:'100%'}} >
            <div className="shadow-sm"> <Header/> </div>
                
            <div className='fst-italic'>
            <Container>

                <Row className='mt-2'>

                <Col className='col-12'>
                               
                    <div className=" shadow p-5 m-5 bg-white">
                        <Row className="pb-3">

                        <h3 className='fw-lighter'>Obras</h3>
                        <hr className="pb-3"></hr>

                            <Form.Group as={Col} lg={4} controlId="formNomeCompleto">
                                <InputGroup className="" size="sm">
                                <InputGroup.Text id="basic-addon1"><AiOutlineSearch/></InputGroup.Text>
                                    <Form.Control placeholder="Pesquisar" aria-label="Pesquisar" aria-describedby="basic-addon1"/>
                                </InputGroup>
                            </Form.Group>

                            <Col className="d-flex justify-content-end">
                                <Button href="/obra/create" variant="outline-primary" size="sm"><AiOutlineUserAdd className="mb-1"/> Cadastro </Button>
                            </Col>

                        </Row>
            
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th className="">Nome</th>
                                <th className="">Email</th>
                                <th className="">Telefone</th>
                                <th colSpan={2} className="text-center">Ações</th>
                            </tr>
                            </thead>
      
                            <tbody>
                            {clientes.map(cliente => (

                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>
                                    <Link to={{ pathname: `edit/${cliente.id}`}}>
                                        <Button variant="outline-success" size="sm">
                                            <FiEdit className="mb-1"/>
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button variant="outline-danger"  size="sm" onClick={ () => deleteObra(cliente.id)}>
                                        <FiTrash2 className="mb-1"/>
                                    </Button>
                                </td>
                            </tr> 
                            ))}
                            </tbody> 
                        </Table>

                    </div>
                               
                </Col>
            
            </Row>
            </Container>

            </div>
                
        </div>
             
    );
};

export default Obra;