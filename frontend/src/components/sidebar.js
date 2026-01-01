import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineMenu } from 'react-icons/ai';
import Nav from 'react-bootstrap/Nav';
import { FiUser } from 'react-icons/fi';
import {BsPiggyBank} from 'react-icons/bs';
import {AiOutlineThunderbolt, AiOutlineProject} from 'react-icons/ai';
import {MdOutlineMonetizationOn, MdConstruction} from 'react-icons/md';
import Logo from './img/Ns_logo.png';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="white" onClick={handleShow} >
        <AiOutlineMenu />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <img src={Logo} width="230" height="50" className="d-inline-block align-top"/> 
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav activeKey="/home" /*={(selectedKey) => alert(`selected ${selectedKey}`)}*/>

        
            <Button variant="outline-light text-dark border-0 mt-5 rounded-5 btn-sm shadow-sm">  
            <Nav.Link href="/clientes" className="d-flex justify-content-start fst-italic fw-semibold"> <FiUser className="mb-1 ms-3 me-2" size={22}/> Clientes </Nav.Link>  
            </Button>

              <Button variant="outline-light text-dark border-0 mt-3 rounded-5 btn-sm shadow-sm">  
              <Nav.Link href="/orcamentos" className="d-flex justify-content-start fst-italic fw-semibold"> <MdOutlineMonetizationOn className="mb-1 ms-3 me-2" size={22}/> Orçamentos </Nav.Link>
              </Button>

              <Button variant="outline-light text-dark border-0 mt-3 rounded-5 btn-sm shadow-sm">  
              <Nav.Link href="/financiamentos" className="d-flex justify-content-start fst-italic fw-semibold"> <BsPiggyBank className="mb-1 ms-3 me-2" size={22}/> Financiamentos </Nav.Link>
              </Button>
            
              <Button variant="outline-light text-dark border-0 mt-3 rounded-5 btn-sm shadow-sm">  
              <Nav.Link href="/peletrico" className="d-flex justify-content-start fst-italic fw-semibold"> <AiOutlineThunderbolt className="mb-1 ms-3 me-2" size={22}/> Projeto Elétrico </Nav.Link>
              </Button>
            
              <Button variant="outline-light text-dark border-0 mt-3 rounded-5 btn-sm shadow-sm">  
              <Nav.Link href="/pcivil" className="d-flex justify-content-start fst-italic fw-semibold"> <AiOutlineProject className="mb-1 ms-3 me-2" size={20}/> Projeto Civíl </Nav.Link>
              </Button>
            
              <Button variant="outline-light text-dark border-0 mt-3 rounded-5 btn-sm shadow-sm">  
              <Nav.Link href="/obras" className="d-flex justify-content-start fst-italic fw-semibold"> <MdConstruction className="mb-1 ms-3 me-2" size={22}/> Obras </Nav.Link>
              </Button>
          
          </Nav>
        </Offcanvas.Body>
        
      </Offcanvas>
    </div>
  );
} 

export default Sidebar;