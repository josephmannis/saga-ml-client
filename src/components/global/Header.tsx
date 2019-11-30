import React from 'react'
import {Nav, Navbar, Button} from "react-bootstrap";
import SearchBar from "../shared/SearchBar";
import {Redirect} from 'react-router-dom';
import { logout } from '../../state/user/actions';
import { searchPublishedProjects } from '../../state/search/actions';
import { useDispatch } from 'react-redux';

export const ConnectedHeader: React.FC = () => {
  const [didSearch, search] = React.useState(false);
  const dispatch = useDispatch();

  const onSearch = (query: string) => {
    console.log('searcing')
    dispatch(searchPublishedProjects(query));
    search(true);
  }

  const onLogout = () => logout()

  return (
    <div>
      {didSearch && <Redirect to='/search'/>}
      <Header onSearch={query => onSearch(query)} onLogout={() => onLogout()}></Header>
    </div>
   
  )
}

interface IHeaderProps {
  onSearch: (query: string) => void;
  onLogout: () => void;
}

// TODO: This component sucks
const Header: React.FC<IHeaderProps> = props => {
  const onSearch = (query: string) => {
    props.onSearch(query);
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Saga</Navbar.Brand>
        <Nav className="ml-auto">
          <SearchBar hintText={"Search for published projects..."} onSearch={query => onSearch(query)}/>
          <Button className='ml-3' variant='outline-danger' onClick={()=> props.onLogout()}>Log out</Button>
        </Nav>
      </Navbar>
    </div>
  );
}

export default ConnectedHeader;
