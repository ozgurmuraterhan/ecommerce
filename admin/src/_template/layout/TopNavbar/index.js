import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export const TopNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">ECommerce Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/ProductCategory">
            <Nav.Link href="/ProductCategory">Product Categories</Nav.Link>
          </Link>
          <Link to="/Product">
            <Nav.Link href="/Product">Products</Nav.Link>
          </Link>
          <Link to="/User">
            <Nav.Link href="/User">Users</Nav.Link>
          </Link>
          <Link to="/Role">
            <Nav.Link href="/Role">Roles</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link to="/Register">
            <Nav.Link href="/Register">Register</Nav.Link>
          </Link>

          <Link to="/Login">
            <Nav.Link eventKey={2} href="/Login">
              Login
            </Nav.Link>
          </Link>

          <NavDropdown title="username" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/Profile/id">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Logout">Exit</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
