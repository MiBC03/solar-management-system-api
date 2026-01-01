import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './sidebar';
import Logo from './img/Ns_logo.png';

function Header() {
  return(
    <div> 
      <Navbar bg="white" expand="lg">
        <Container>
          <div className="pe-5"> <Sidebar/></div>

            <Navbar.Brand className='fw-bold text-center'> 
              <img src={Logo} width="230" height="50" className="d-inline-block align-top" alt='Logo da Empres Norte Sol'/> 
            </Navbar.Brand>
  
          </Container>

      </Navbar>
    </div>
  );
}

export default Header;