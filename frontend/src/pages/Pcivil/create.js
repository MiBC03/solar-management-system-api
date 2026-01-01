import React from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePcivil(){
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm()

    const addPcivil = data => axios.post("http://localhost:3030/clientes/", data)
    .then(() => {
        console.log("Deu certo")
        navigate("/pcivil");
    }).catch(() => {
        console.log("Deu erro")
    })

    return(
        <div className='bg-light' style={{height:'100vh'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p style={{color: "white", textAlign: 'center', padding: "5px", background: "#2271b3"}}> Cadastro de Projeto Civil </p>

            <Container fluid>
                <Row className="d-flex justify-content-center">

                <Col className='col-8 mt-5' >    
                <Form className="bg-white shadow p-5 d-flex flex-column justify-content-center" onSubmit={handleSubmit(addPcivil)}>
                            
                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={7} controlId="formNomeCompleto">
                            <Form.Label column="sm" >Nome Completo</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('clt_nome')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={5} sm={6} md={6} controlId="formGridEmail">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm" type="email" placeholder="Enter email" {...register('clt_email')} />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={5} sm={6} md={6} controlId="formTelefone">
                            <Form.Label column="sm">Telefone</Form.Label>
                            <Form.Control size="sm" type="text" {...register('clt_telefone')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} width="50%" controlId="formTipo">
                            <Form.Label column="sm">Tipo de cliente</Form.Label>
                            <Form.Select size="sm" defaultValue="">
                                <option> Pessoa Física</option>
                                <option> Pessoa Jurídica</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formCPF">
                            <Form.Label column="sm">CPF</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formCNPJ">
                            <Form.Label column="sm">CNPJ</Form.Label>
                            <Form.Control size="sm" type="text" />
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formEmpresa">
                            <Form.Label column="sm">Empresa</Form.Label>
                            <Form.Control size="sm" type="text" />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={3} md={3} controlId="formCEP">
                            <Form.Label column="sm" >CEP</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={4} md={4} controlId="formEstado">
                            <Form.Label column="sm">Estado</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={3} sm={5} md={5} controlId="formCidade">
                            <Form.Label column="sm">Cidade</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formBairro">
                            <Form.Label column="sm">Bairro</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formRua">
                            <Form.Label column="sm">Rua</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6} controlId="formNumero">
                            <Form.Label column="sm">Número</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={8} sm={6} md={6} controlId="formComplemento">
                            <Form.Label column="sm">Complemento</Form.Label>
                            <Form.Control size="sm" type="text"/>
                        </Form.Group>
                    </Row>

                    <div className="mt-3 d-flex justify-content-center">
                        <Button  variant="outline-primary" size="sm" type="submit"> Cadastrar </Button>
                    </div>
        
                </Form>
                </Col>

                </Row>
            </Container>
            </div>
            
        </div>
    );
};

export default CreatePcivil;