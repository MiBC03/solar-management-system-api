import React, {useState} from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {mask, unMask} from 'remask'
import api from '../../services/api';
function CreateCliente() {

    let navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm()


    const addCliente = async data => { 
        await api.post("/clientes/create/", data).then(({data}) => {
        navigate("/clientes")
        toast.success(data);
        toast.error(data.sqlMessage);
    }).catch(({data}) => {
        toast.error(data);
    })   
}

    const CheckCEP = (e) => {
        const clt_CEP = e.target.value.replace(/\D/g, '');
        console.log(clt_CEP);
        fetch(`https://viacep.com.br/ws/${clt_CEP}/json/`)
        .then(res => res.json()).then(data => {
            console.log(data);
            setValue('clt_estado', data.uf);
            setValue('clt_cidade', data.localidade);
            setValue('clt_complemento', data.complemento);
            setValue('clt_bairro', data.bairro);
        });
        
    };

    const [valueTEL, setValueTEL] = useState("");
    const onChangeTEL = ev => {
        const originalValue = unMask(ev.target.value);
        const maskedValue = mask(originalValue, ["(99) 9 9999-9999"]);
        setValueTEL(maskedValue);
    }

    const [valueCPF, setValueCPF] = useState("");
    const onChangeCPF = ev => {
        const originalValue = unMask(ev.target.value);
        const maskedValue = mask(originalValue, ["999.999.999-99"]);
        setValueCPF(maskedValue);
    }

    const [valueCEP, setValueCEP] = useState("");
    const onChangeCEP = ev => {
        const originalValue = unMask(ev.target.value);
        const maskedValue = mask(originalValue, ["99999-999"]);
        setValueCEP(maskedValue);
    }

    const [valueCNPJ, setValueCNPJ] = useState("");
    const onChangeCNPJ = ev => {
        const originalValue = unMask(ev.target.value);
        const maskedValue = mask(originalValue, ["99.999.999/9999-99"]);
        setValueCNPJ(maskedValue);
    } 
    
    return(
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p className='shadow' style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Cadastro de Clientes </p>

            <Container fluid>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-2' >    
                <Form className="bg-white shadow p-5 mb-5 d-flex flex-column justify-content-center border-0 rounded-4" onSubmit={handleSubmit(addCliente)}>
                            
                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={7}>
                            <Form.Label column="sm" >Nome Completo</Form.Label>
                            <Form.Control className="text-uppercase" size="sm" type="text" {...register('clt_nome')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={5} sm={6} md={6}>
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm" type="email" {...register('clt_email')} />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={5} sm={6} md={6}>
                            <Form.Label column="sm">Telefone</Form.Label>
                            <Form.Control 
                            size="sm" 
                            type="text" 
                            id="telefone"
                            {...register('clt_telefone')}
                            onChange={onChangeTEL}
                            value={valueTEL}                            
                            />
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6} width="50%">
                            <Form.Label column="sm">Tipo de cliente</Form.Label>
                            <Form.Select size="sm" {...register('clt_tipo')}>
                                <option value={"PF"}> Pessoa Física</option>
                                <option value={"PJ"}> Pessoa Jurídica</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6}>
                            <Form.Label column="sm">CPF</Form.Label>
                            <Form.Control 
                             size="sm"
                             id="cpf" 
                             type="text"
                             {...register('clt_CPF')}
                             onChange={onChangeCPF}
                             value={valueCPF}
                             
                             />
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Data de Nascimento</Form.Label>
                            <Form.Control 
                            size="sm" 
                            type="date"
                            {...register('clt_dataNasc')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">RG</Form.Label>
                            <Form.Control size="sm" type="text" {...register('clt_RG')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Órgão Expedidor (RG)</Form.Label>
                            <Form.Control size="sm" type="text" {...register('clt_orgaoEx')}/>
                        </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">CNPJ</Form.Label>
                            <Form.Control 
                            size="sm" 
                            type="text"
                            {...register('clt_CNPJ')} 
                            onChange={onChangeCNPJ}
                            value={valueCNPJ} 
                            />
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Empresa</Form.Label>
                            <Form.Control size="sm" type="text" {...register('clt_empresa')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={3} md={3}>
                            <Form.Label column="sm" >CEP</Form.Label>
                            <Form.Control 
                            size="sm" 
                            type="text" 
                            {...register("clt_CEP")} 
                            onBlur={CheckCEP}
                            onChange={onChangeCEP}
                            value={valueCEP}
                            />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={4} md={4}>
                            <Form.Label column="sm">Estado</Form.Label>
                            <Form.Control size="sm" type="text" {...register("clt_estado")}/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">

                        <Form.Group as={Col} lg={3} sm={5} md={5}>
                            <Form.Label column="sm">Cidade</Form.Label>
                            <Form.Control size="sm" type="text" {...register("clt_cidade")}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6}>
                            <Form.Label column="sm">Bairro</Form.Label>
                            <Form.Control size="sm" type="text" {...register("clt_bairro")}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} sm={6} md={6} >
                            <Form.Label column="sm">Rua</Form.Label>
                            <Form.Control size="sm" type="text"  {...register("clt_rua")}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Número</Form.Label>
                            <Form.Control size="sm" type="text"  {...register("clt_numero")}/>
                        </Form.Group>

                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Form.Group as={Col} lg={8} sm={6} md={6}>
                            <Form.Label column="sm">Complemento</Form.Label>
                            <Form.Control size="sm" type="text" {...register("clt_complemento")}/>
                        </Form.Group>
                    </Row>

                    <div className="mt-3 d-flex justify-content-center">
                        <Button title='Botão de Cadastro de Novos usuários' variant="outline-primary" size="sm" type="submit"> Cadastrar </Button>
                    </div>

                    
                </Form>
                </Col>

                </Row>
            </Container>

           
            </div>
            
        </div>
    );
    };




export default CreateCliente;