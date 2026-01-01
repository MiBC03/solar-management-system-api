import React, {useState, useEffect} from 'react';
import Header from "../../components/Headers";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from '../../components/img/login.svg';
import { ErrorMessage, Formik, Field } from "formik";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom';
/*mport axios from 'axios';
import * as yup from "yup";*/

function SignIn() {

  /*const validationsLogin = yup.object().shape({
    emailFun: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    senha: yup
      .string()
      .min(3, "A senha deve ter pelo menos 3 caracteres")
      .required("A senha é obrigatória"),
  });*/

  /*axios.defaults.withCredentials = true;*/

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  let navigate = useNavigate();

  const login = async () => {
    await api.post("/login/", {
      fun_email: email,
      fun_senha: senha,
    }).then((response) => {
      if(response.data.loginA) {
        toast.success("Usuário logado com sucesso!");
        navigate("/clientes")
      } else {
        toast.error("Algo deu errado!");
      }
    })
  }
  
  /*useEffect(() => {
    axios.get("http://localhost:8800/login").then((response) => {
      console.log(response)
    });
  }, []); */

  return (
   
    <div className='bg-light' style={{height:'100vh '}}>
    <div className="shadow-sm"> <Header/> </div>
 
    <div>
    <Container fluid>

      <Row>
        <Col  as={Col} sm={12} md={12} className='col-lg-6'>
        <Row className="d-flex justify-content-center">

        <Col className='col-8 mt-3 mb-2 pt-5' >    
        <Formik
        initialValues={{}}
        /*validationSchema={validationsLogin}*/
        >
        <Form className="bg-white shadow p-5 mb-5 border-0 rounded-4">
                    
            <Row className="d-flex justify-content-center">

                
              <h3 className='d-flex justify-content-center pb-3 fw-lighter fst-italic'>Login</h3>

                <Form.Group>
                    <Form.Label column="sm fw-lighter fst-italic">Email*</Form.Label>
                    
                    <Field size="sm" name="emailFun" /*onClick={style={border: '#1517b4'}}*/  className='fw-lighter form-control' placeholder='example@gmail.com' 
                    type="email" onChange = {(e) => {
                      setEmail(e.target.value)
                    }} />

                    <ErrorMessage
                      component="span"
                      name="emailFun"
                      className="form-error fw-lighter p-1 text-danger"
                    />
                </Form.Group>

            </Row>
            <Row className="pt-3 d-flex justify-content-center">

                <Form.Group>
                    <Form.Label column="sm fw-lighter fst-italic">Senha*</Form.Label>
                    <Field size="sm" name='senha' /*onClick={style={border: '#1517b4'}}*/ className='fw-lighter form-control' placeholder='**********' 
                    type="password" onChange = {(e) => {
                      setSenha(e.target.value)}} />
                    <ErrorMessage
                      component="span"
                      name="senha"
                      className="form-error fw-lighter p-1 text-danger"
                    />
                </Form.Group>
                

            </Row>


            <div className="mt-3 d-flex justify-content-center">
                <Button title='Botão de Login'  size="sm" className='fw-lighter fst-italic px-3 mt-2' style={{backgroundColor: "#1517b4", color:"light"}} onClick={login}> Entrar </Button>
            </div>

            
        </Form>
        </Formik>
        </Col>

        </Row>
        </Col>

       
       
          <Col className='d-none d-lg-block'>
          <Row className="d-flex justify-content-start ps-5 ms-5">

          <Col className='mt-5 mb-2 pt-5 d-none d-lg-block'>
            <img src={Login} width="500" height="400" className="d-inline-block align-top" alt='Logo da Empres Norte Sol'/> 
          </Col>

  
          </Row>
          </Col>
      

        </Row>

    </Container>
    <ToastContainer autoClose={1000} position={toast.POSITION.TOP_RIGHT} />
   
    </div>
    
</div>
  );
}

export default SignIn;