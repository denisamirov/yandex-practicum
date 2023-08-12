import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Mynavbar = ({ user }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#">{user}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">На главную</Nav.Link>
          <Nav.Link href="https://github.com/">Исходник App</Nav.Link>
          <Nav.Link href="/youtube">Фишка CSS</Nav.Link>
          <Nav.Link href="/content">Форма обратной связи</Nav.Link>
          <Nav.Link href="/task">Сила JS</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
