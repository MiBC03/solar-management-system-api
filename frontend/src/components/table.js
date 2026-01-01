import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Table } from 'reactstrap';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiOutlineUserAdd, AiOutlineSearch} from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Tabela = ({ clientes, setClientes, setOnEdit }) => {

  const handleEdit = (cliente) => {
    setOnEdit(cliente);
}

    const handleDelete = async (clt_codigo) => {
        await axios
          .delete("http://localhost:8800/" + clt_codigo)
          .then(({ data }) => {
            const newArray = clientes.filter((cliente) => cliente.clt_codigo !== clt_codigo);
    
            setClientes(newArray);
            toast.success(data);
          })
          .catch(({ data }) => toast.error(data));
    
        setOnEdit(null);
      };

      const TooltipEditar = (props) => (
        <Tooltip id="editar" {...props}>
          Editar
        </Tooltip>
      );

    const TooltipExcluir = (props) => (
        <Tooltip id="excluir" {...props}>
          Excluir
        </Tooltip>
      );

      const [busca, setBusca] = useState([]);
      console.log(busca)

  return (

    <div className=" shadow p-5 m-5 bg-white rounded-4">
        <Row className="pb-3">

            <h3 className="fst-italic fw-bold">Clientes</h3>
            <hr className="pb-3"></hr>

            <Form.Group as={Col} lg={4} controlId="formNomeCompleto">
                <InputGroup size="sm">
                    <InputGroup.Text id="basic-addon1"><AiOutlineSearch/></InputGroup.Text>
                    <Form.Control placeholder="Pesquisar" aria-label="Pesquisar" aria-describedby="basic-addon1" value={busca} onChange={(ev) => setBusca(ev.target.value)}/>
                </InputGroup>
            </Form.Group>

            <Col className="d-flex justify-content-end">
                <Button href="/clientes/create" variant="outline-primary" size="sm"><AiOutlineUserAdd className="mb-1"/> Cadastro </Button>
            </Col>

        </Row>
            
        <Table size="sm" responsive>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th colSpan={2} className="text-center">Ações</th>
                </tr>
            </thead>
      
            <tbody>
            {clientes.map(cliente => (

                <tr key={cliente.clt_codigo}>
                    <td> <a href="#" className="text-decoration-none text-dark fw-normal fst-italic">{cliente.clt_nome}</a></td>
                    <td> <a href="#" className="text-decoration-none text-dark fw-normal fst-italic">{cliente.clt_email}</a></td>
                    <td> <a href="#" className="text-decoration-none text-dark fw-normal fst-italic">{cliente.clt_telefone}</a></td>
                    <td>
                        
                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={TooltipEditar}>
                            <Button variant="outline-success" size="sm">
                                <FiEdit className="mb-1" onClick={() => handleEdit(cliente)}/>
                            </Button>
                        </OverlayTrigger>
                        
                        </td>
                        <td>
                            <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={TooltipExcluir}>
                                <Button variant="outline-danger"  size="sm" onClick={() => handleDelete(cliente.clt_codigo)}>
                                    <FiTrash2 className="mb-1"/>
                                </Button>
                            </OverlayTrigger>
                        </td>
                    </tr> 
                ))}
                </tbody> 
            </Table>
  </div>

  );
}

export default Tabela;