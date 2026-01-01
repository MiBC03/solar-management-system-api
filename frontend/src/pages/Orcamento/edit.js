import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"
import api from '../../services/api';

function EditOrcamento(){
    const { orcamentoId } = useParams();
    let navigate = useNavigate();

    const attOrcamento = async data => { 
        await api.put(`/orcamentos/edit/${orcamentoId}`, data).then(({data}) => {
        navigate("/orcamentos");    
        toast.success(data);   
        }).catch(({data}) => {
            toast.error(data)
        })
    }

    const { register, handleSubmit } = useForm()
    
    const [orcamento, setOrcamento] = useState([]);

    const getUmOrcamentoEsp = async () => {
        try {
          const res = await api.get(`/orcamento/${orcamentoId}`);
          setOrcamento(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getUmOrcamentoEsp();
      }, [setOrcamento]);

    return (
        <div className='bg-light' style={{height:'100%'}}>
            <div className="shadow-sm"> <Header/> </div>
         
            <div>
            <p style={{color: "white", textAlign: 'center', padding: "5px", background: "#1518b3"}}> Atualização de Orçamentos </p>

            {orcamento.map(orc => (
            <Container fluid key={orc.orc_codigo}>
                <Row className="d-flex justify-content-center">

                <Col className='col-10 mt-3 mb-2' >    
                <Form className="bg-white shadow p-5 d-flex flex-column justify-content-center border-0 rounded-4" onSubmit={handleSubmit(attOrcamento)}>

                    <h6 className='pt-3'>DADOS DA FATURA</h6>  
                    <Row>
                        
                        <Form.Group as={Col} lg={3}>
                            <Form.Label column="sm" >Consumo médio mensal (kWh)</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_consumoM} {...register('orc_consumoM')}/>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Tarifa (R$)</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_tarifa} {...register('orc_tarifa')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={2}>
                            <Form.Label column="sm" >Tensão da Rede</Form.Label>
                            <Form.Select size="sm" defaultValue={orc.orc_tensaoR} {...register('orc_tensaoR')} >
                                    <option value={"220"}> 220V </option>
                                    <option value={"127"}> 127V </option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Fase</Form.Label>
                            <Form.Select size="sm" defaultValue={orc.orc_fase} {...register('orc_fase')}>
                                    <option value={"Mon"}> Monofásico </option>
                                    <option value={"Bi"}> Bifásico </option>
                                    <option value={"Tri"}> Trifásico </option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} lg={3} sm={6} md={6}>
                            <Form.Label column="sm">Custo Disponibilidade</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_disponibilidade} {...register('orc_disponibilidade')} />
                        </Form.Group>

                    </Row>
                    
                    <Row>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Tipo de Telhado</Form.Label>
                            <Form.Select size="sm" defaultValue={orc.orc_telhado} {...register('orc_telhado')}>
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
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_custo} {...register('orc_custo')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Potência</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_potencia} {...register('orc_potencia')} />
                        </Form.Group>

                        <Form.Group as={Col} lg={2} sm={6} md={6}>
                            <Form.Label column="sm">Vencimento</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={orc.orc_vencimento} {...register('orc_vencimento')} />
                        </Form.Group>

                    </Row>

                    <h6 className='pt-3'>CUSTOS EMBUTIDOS</h6>
                    <Row /*className="d-flex justify-content-center"*/ >
                        <Form.Group as={Col} lg={12} sm={6} md={6}>    
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Módulos" label="Módulos" defaultChecked={orc.orc_custosEmbutidosMod} {...register('orc_custosEmbutidosMod')} />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Inversores" label="Inversores" defaultChecked={orc.orc_custosEmbutidosInv} {...register('orc_custosEmbutidosInv')}  />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Estruturas" label="Estruturas" defaultChecked={orc.orc_custosEmbutidosEst} {...register('orc_custosEmbutidosEst')}  />
                            <Form.Check inline name="custosEmbutidos" type="checkbox" id="Transformador" label="Transformador" defaultChecked={orc.orc_custosEmbutidosTra} {...register('orc_custosEmbutidosTra')}  />
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
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_qtdM} {...register('orc_qtdM')} />
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" defaultChecked={orc.orc_avulsoM == 1} {...register('orc_avulsoM')} id="AvusloM"/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Módulo</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_modulo} {...register('orc_modulo')} />
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
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_qtdI} {...register('orc_qtdI')}/>
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" defaultChecked={orc.orc_avulsoI == 1} {...register('orc_avulsoI')} id="AvusloI"/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Inversor</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_inversor} {...register('orc_inversor')}/>
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
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_qtdO} {...register('orc_qtdO')} />
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" defaultChecked={orc.orc_avulsoO == 1} {...register('orc_avulsoO')} id="AvusloO"/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Otimizador</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_otimzador} {...register('orc_otimizador')} />
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
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_qtdC} {...register('orc_qtdC')} />
                        </Form.Group>   

                        <Form.Group as={Col} lg={1} sm={6} md={6} >
                        <Form.Label column="sm">Avulso?</Form.Label>
                            <Form.Check type="switch" defaultChecked={orc.orc_avulsoC == 1} {...register('orc_avulsoC')} id="AvusloC"/>
                        </Form.Group>    

                        <Form.Group as={Col} lg={9} sm={6} md={6} >
                        <Form.Label column="sm" >Componente</Form.Label>
                            <Form.Control size="sm" type="text" defaultValue={orc.orc_componente} {...register('orc_componente')}/>
                        </Form.Group>
                    </Row>

                    <div className="mt-3 d-flex justify-content-center">
                        <Button variant="outline-primary" size="sm" type="submit"> Atualizar </Button>
                    </div>
        
                </Form>
                </Col>

                </Row>
            </Container>
            ))}
           
            </div>
            
        </div>
  );
};

export default EditOrcamento;