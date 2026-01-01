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
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function CreatePeletrico(){
    let navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    const addPeletrico = async data => {
        await axios.post("http://localhost:8800/peletrico/create", data).then(({data}) => {
        navigate("/peletrico");
        toast.success(data);
        toast.error(data.sqlMessage);
    }).catch(({data}) => {
        toast.error(data);
    })
}


    return(
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Cadastro de Projeto Elétrico </p>
            
            <Container fluid>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-2' >    
                <Form className="bg-white shadow p-5 mb-5 d-flex flex-column justify-content-center border-0 rounded-4" enctype="multipart/form-data" onSubmit={handleSubmit(addPeletrico)}>
                            
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Fatura de energia do local de instalação (GD)</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">RG, CPF OU CNH Titular da conta de energia</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Foto da fachada</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Foto do quadro</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Foto Dijuntor</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Qual a carga do dijuntor</Form.Label>
                            <Form.Control size="sm" type="text" />
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Distância quadro para inversor</Form.Label>
                            <Form.Control size="sm" type="text" />
                        </Form.Group>
                    </Row>
                    <hr></hr>

                    <Row>
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Foto Ramal Arereo (Poste)</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Foto Ramal de entrada</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Latitude e Longitude</Form.Label>
                            <Form.Control size="sm" type="text" />
                        </Form.Group>
                    </Row>
                    <hr></hr>

                    <Row>
                        <Form.Group as={Col} lg={3} sm={6} md={6}>
                            <Form.Label column="sm">Haverá unidades Benificiarias?</Form.Label>
                            <Form.Check type="switch" id="Benificiarias" {...register('fin_naturezaApo')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Faturas das unidades Benificiarias</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} >
                            <Form.Label column="sm">Houve troca de titularidade? </Form.Label>
                            <Form.Check type="switch" id="Benificiarias" {...register('fin_naturezaApo')}/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} lg={12} sm={6} md={6} >
                            <Form.Label column="sm">Descreva a troca de titularidade - UCs</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px' }} {...register('fin_observacoes')}/>
                        </Form.Group>
                    </Row>
                    <hr></hr>

                    <Row>
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Arquivos adicionais</Form.Label>
                            <Form.Control type="file" multiple size="sm"/>
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

export default CreatePeletrico;