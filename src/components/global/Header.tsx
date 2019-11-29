import React from 'react'
import {Nav, Navbar, Button} from "react-bootstrap";
import SearchBar from "../shared/SearchBar";
import {Redirect} from 'react-router-dom';
import { logout } from '../../state/user/actions';

export const ConnectedHeader: React.FC = () => {
  const onSearch = (query: string) => {
    return(<Redirect to='/search'/>);
  }

  const onLogout = () => logout()
  
  return (
    <Header onSearch={query => onSearch(query)} onLogout={() => onLogout()}/>
  )
}

interface IHeaderProps {
  onSearch: (query: string) => void;
  onLogout: () => void;
}

// TODO: This component sucks
const Header: React.FC<IHeaderProps> = props => {
  const [didSearch, search] = React.useState(false);
  
  const onSearch = () => {
    search(true);
  }


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Saga</Navbar.Brand>
        <Nav className="ml-auto">
          <SearchBar hintText={"Search for projects..."} onSearch={() => onSearch()}/>
          <Button variant='outline-danger' onClick={()=> props.onLogout()}>Log out</Button>
        </Nav>
      </Navbar>
    </div>
  );
}

export default ConnectedHeader;
