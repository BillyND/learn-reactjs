import NavDropdown from "react-bootstrap/NavDropdown";
const Languages = (props) => {
  return (
    <NavDropdown title="Việt Nam" className="dropdown-language">
      <NavDropdown.Item className="item-dropdown">English</NavDropdown.Item>
      <NavDropdown.Item className="item-dropdown">Việt Nam</NavDropdown.Item>
    </NavDropdown>
  );
};

export default Languages;
