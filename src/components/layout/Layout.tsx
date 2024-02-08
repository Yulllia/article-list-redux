import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Layout = () => {
  return (
    <>
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Custom list</Nav.Link>
            <Nav.Link href="news">News list</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;


