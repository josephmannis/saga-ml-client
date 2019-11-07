import React from 'react'
import {Form, Nav, Navbar} from "react-bootstrap";
import SearchBar from "../shared/SearchBar";
import HelpButton from "../shared/HelpButton";

interface IHeaderProps {

}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Saga</Navbar.Brand>
      <Nav className="ml-auto">
        <HelpButton/> {/* Need to make clicking this do something*/}
        <SearchBar hintText={"Search for projects..."}/>
      </Nav>
    </Navbar>
  );
};

export default Header;
