
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import React, { useEffect, useRef } from "react";
import {useForm} from 'react-hook-form'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



const FormCadastro = ({ onEdit, setOnEdit }) => {
  const ref = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    if (onEdit) {
      const cliente = ref.current;

      cliente.clt_nome.value = onEdit.clt_nome;
      cliente.clt_email.value = onEdit.clt_email;
      cliente.clt_telefone.value = onEdit.clt_telefone;

    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cliente = ref.current;

    if (
      !cliente.clt_nome.value ||
      !cliente.clt_email.value ||
      !cliente.clt_telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.clt_codigo, {
          clt_nome: cliente.clt_nome.value,
          clt_email: cliente.clt_email.value,
          clt_telefone: cliente.clt_telefone.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          clt_nome: cliente.clt_nome.value,
          clt_email: cliente.clt_email.value,
          clt_telefone: cliente.clt_telefone.value
        })
        .then(({ data }) => toast.success(data), navigate("/clientes"))
        .catch(({ data }) => toast.error(data));
    }

    cliente.clt_nome.value = "";
    cliente.clt_email.value = "";
    cliente.clt_telefone.value = "";

    setOnEdit(null);
    //getClientes();
  };

      const CheckCEP = (e) => {
      const {register, setValue} = useForm();
      const cep = e.target.value.replace(/\D/g, '');
      console.log(cep);
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        console.log(data);
        setValue('UF', )
      });
    }
      return(
         <div>
            <Form className="bg-white rounded-4 shadow p-5 d-flex flex-column justify-content-center" ref={ref} onSubmit={handleSubmit}>
                
                <Row className="d-flex justify-content-center">

                <Form.Group as={Col} lg={4} controlId="formNomeCompleto">
                    <Form.Label column="sm" >Nome Completo</Form.Label>
                    <Form.Control size="sm" type="text" name="clt_nome"/>
                </Form.Group>

                <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formGridEmail">
                    <Form.Label column="sm">Email</Form.Label>
                    <Form.Control size="sm" type="email" name="clt_email"/>
                </Form.Group>

                <Form.Group as={Col} lg={4} sm={6} md={6} controlId="formCPF">
                    <Form.Label column="sm">CPF</Form.Label>
                    <Form.Control size="sm" type="text"/>
                </Form.Group>

                </Row>

                <Row>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formTipo">
                    <Form.Label column="sm">Tipo de cliente</Form.Label>
                    <Form.Select size="sm" defaultValue="">
                        <option> Pessoa Física</option>
                        <option> Pessoa Jurídica</option>
                    </Form.Select>
                 </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formTelefone">
                    <Form.Label column="sm">Telefone</Form.Label>
                    <Form.Control size="sm" type="text" name="clt_telefone"/>
                </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formCNPJ">
                    <Form.Label column="sm">CNPJ</Form.Label>
                    <Form.Control size="sm" type="text" />
                </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formEmpresa">
                    <Form.Label column="sm">Empresa</Form.Label>
                    <Form.Control size="sm" type="text" />
                </Form.Group>

                </Row>

                <Row>

                <Form.Group as={Col} lg={4} sm={3} md={3} controlId="formCEP">
                    <Form.Label column="sm" >CEP</Form.Label>
                    <Form.Control size="sm" type="text" onBlur={CheckCEP}/>
                </Form.Group>

                <Form.Group as={Col} lg={4} sm={4} md={4} controlId="formEstado">
                    <Form.Label column="sm">Estado</Form.Label>
                    <Form.Control size="sm" {...register("UF")} type="text"/>
                </Form.Group>

                <Form.Group as={Col} lg={4} sm={5} md={5} controlId="formCidade">
                    <Form.Label column="sm">Cidade</Form.Label>
                    <Form.Control size="sm" {...register("cidade")} type="text"/>
                </Form.Group>

                </Row>

                <Row>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formBairro">
                    <Form.Label column="sm">Bairro</Form.Label>
                    <Form.Control size="sm" {...register("bairro")} type="text"/>
                </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formRua">
                    <Form.Label column="sm">Rua</Form.Label>
                    <Form.Control size="sm" {...register("rua")} type="text"/>
                </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formNumero">
                    <Form.Label column="sm">Número</Form.Label>
                    <Form.Control size="sm" type="text"/>
                </Form.Group>

                <Form.Group as={Col} lg={3} sm={6} md={6} controlId="formComplemento">
                    <Form.Label column="sm">Complemento</Form.Label>
                    <Form.Control size="sm" type="text"/>
                </Form.Group>

                </Row>

                <div className="mt-3 d-flex justify-content-center">
                    <Button  variant="outline-primary" size="sm" type="submit"> Cadastrar </Button>
                </div>

                <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_LEFT} />
            </Form>

         </div>
      );
  };

export default FormCadastro;