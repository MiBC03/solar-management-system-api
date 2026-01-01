import React, {useEffect, useState } from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import api from '../../services/api';

function CreateOrcamento() {
    const { clienteId } = useParams();
    let navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    const addOrcamento = async data => { 
        await api.post("/orcamentos/create/", data).then(({data}) => {
        navigate("/orcamentos")
        toast.success(data);
        toast.error(data.sqlMessage);
    }).catch(({data}) => {
        toast.error(data)
    })   
}

    return(
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Cadastro de Orçamento </p>

            <Container fluid>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-2' >    
                <Form className="bg-white shadow p-5 d-flex flex-column justify-content-center border-0 rounded-4" onSubmit={handleSubmit(addOrcamento)}>

                    <h6 className='pt-3'>DADOS DA FATURA</h6>  
                    <Row>
                        
                        <Form.Group as={Col} lg={3} hidden>
                            <Form.Label column="sm" >Cliente Codigo</Form.Label>
                            <Form.Control size="sm" type="text" value={clienteId} {...register('orc_clienteCodigo')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={3}>
                            <Form.Label column="sm" >Consumo médio mensal (kWh)</Form.Label>
                            <Form.Control size="sm" type="text" {...register('orc_consumoM')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Tarifa (R$)</Form.Label>
                            <Form.Control size="sm" type="text" {...register('orc_tarifa')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={2}>
                            <Form.Label column="sm" >Tensão da Rede</Form.Label>
                            <Form.Select size="sm" {...register('orc_tensaoR')}>
                                    <option value={"220"}> 220V </option>
                                    <option value={"127"}> 127V </option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Fase</Form.Label>
                            <Form.Select size="sm" {...register('orc_fase')}>
                                    <option value={"Mon"}> Monofásico </option>
                                    <option value={"Bi"}> Bifásico </option>
                                    <option value={"Tri"}> Trifásico </option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6}>
                            <Form.Label column="sm">Custo Disponibilidade</Form.Label>
                            <Form.Control size="sm" type="text" {...register('orc_disponibilidade')} />
                        </Form.Group>

                    </Row>
                    
                    <Row>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Tipo de Telhado</Form.Label>
                            <Form.Select size="sm" {...register('orc_telhado')}>
                                    <option value={"C"}> Carport </option>
                                    <option value={"Ce"}> Cerâmico </option>
                                    <option value={"F"}> Fibracionado </option>
                                    <option value={"L"}> Laje </option>
                                    <option value={"S"}> Shingle </option>
                                    <option value={"M"}> Métalico </option>
                                    <option value={"Z"}> Zipado </option>
                                    <option value={"S"}> Solo </option>
                                    <option value={"SE"}> Sem Estrutura </option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={3}>
                            <Form.Label column="sm" >Custo</Form.Label>
                            <Form.Control size="sm" type="text" {...register('orc_custo')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Potência</Form.Label>
                            <Form.Control size="sm" type="text" {...register('orc_potencia')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Vencimento</Form.Label>
                            <Form.Control size="sm" type="date" {...register('orc_vencimento')} />
                        </Form.Group>

                    </Row>

                    <h6 className='pt-3'>CUSTOS EMBUTIDOS</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Group as={Col} lg={12} sm={6} md={6}>
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Módulos" label="Módulos" {...register('orc_custosEmbutidosMod')} />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Inversores" label="Inversores" {...register('orc_custosEmbutidosInv')} />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Estruturas" label="Estruturas" {...register('orc_custosEmbutidosEst')} />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Transformador" label="Transformador" {...register('orc_custosEmbutidosTra')} />
                        </Form.Group>
                    </Row>

                    <h6 className='pt-3'>ITENS</h6>
                    <Row /*className="d-flex justify-content-center"*/  >
                        <Form.Label column="sm" lg={2}> Tipo: </Form.Label>
                            <Col><p> Módulo </p></Col>                               
                    </Row>

                    <Row>
                        
                        <Form.Group as={Col} lg={2} sm={6} md={6} >
                        <Form.Label column="sm" >Quantidade</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_qtdM')}/>
                        </Form.Group>       

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm" id="avulsoM"> Avulso?</Form.Label>
                            <Form.Check type="switch" id="avulsoM" {...register('orc_avulsoM')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Módulo</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_modulo')}/>
                        </Form.Group>

                    </Row>
                    <hr></hr>

                    <Row>

                        <Form.Label column="sm" lg={2}> Tipo: </Form.Label>
                            <Col><p> Inversor </p></Col>
                                                        
                    </Row>
                    
                    <Row>

                        <Form.Group as={Col} lg={2} sm={6} md={6} >
                        <Form.Label column="sm" >Quantidade</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_qtdI')}/>
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" id="AvulsoI" {...register('orc_avulsoI')}/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Inversor</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_inversor')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>

                    <Row>

                        <Form.Label column="sm" lg={2}> Tipo: </Form.Label>
                            <Col><p> Otimizador </p></Col>
                                                        
                    </Row>
                    
                    <Row>

                        <Form.Group as={Col} lg={2} sm={6} md={6} >
                        <Form.Label column="sm" >Quantidade</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_qtdO')}/>
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" {...register('orc_avulsoO')}/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Otimizador</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_otimizador')}/>
                        </Form.Group>
                    </Row>

                    <hr></hr>

                    <Row>

                        <Form.Label column="sm" lg={2}> Tipo: </Form.Label>
                            <Col><p> Componente </p></Col>
                                                        
                    </Row>
                    
                    <Row>

                        <Form.Group as={Col} lg={2} sm={6} md={6} >
                        <Form.Label column="sm" >Quantidade</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_qtdC')}/>
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" {...register('orc_avulsoC')}/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Componente</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="" {...register('orc_componente')}/>
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

export default CreateOrcamento;