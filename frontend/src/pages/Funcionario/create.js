import React, { useState } from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';  
import api from '../../services/api';

function CreateFuncionario(){
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm()

    const addFuncionario = async data => { 
        await api.post("/funcionario/create/", data).then(({data}) => {
            console.log(data)
        //navigate("/clientes")
        //toast.success(data);
        //toast.error(data.sqlMessage);
    }).catch(({data}) => {
        //toast.error(data);
    })   
}
    return(
        <div className='bg-light' style={{height:'100vh'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p className='shadow' style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Cadastro de Funcionário </p>

            <Container fluid>
                <Row className="d-flex justify-content-center">

                <Col className='col-8 mt-5' >    
                <Form className="bg-white shadow p-5 d-flex flex-column justify-content-center" onSubmit={handleSubmit(addFuncionario)}>
                            
                    <Row className="d-flex justify-content-center">

                        <Form.Group>
                            <Form.Label column="sm" >Nome Completo</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('fun_nome')}/>
                        </Form.Group>

                     

                    </Row>
                    <Row className="d-flex justify-content-center">

                    <Form.Group >
                        <Form.Label column="sm">Email</Form.Label>
                        <Form.Control size="sm"  type="email" placeholder="Enter email" {...register('fun_email')} />
                    </Form.Group> 

                    </Row>

                    <Row className="d-flex justify-content-center">

                    <Form.Group>
                        <Form.Label column="sm">Senha</Form.Label>
                        <Form.Control size="sm"  type="password" {...register('fun_senha')} />
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

export default CreateFuncionario;