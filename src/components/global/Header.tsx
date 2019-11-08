import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import SearchBar from "../shared/SearchBar";
import {Redirect} from 'react-router-dom';

interface IHeaderProps {

}

interface IHeaderState {
  didSearch: boolean;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      didSearch: false
    }
  }

  onSearch = () => {
    this.setState({didSearch: true});
  }

  public render() {
    return (
      <div>
        {/* This WOULD create a redux dispatch but we ain't doin that yet... */}
        {this.state.didSearch && <Redirect to='/search'/>}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Saga</Navbar.Brand>
          <Nav className="ml-auto">
            <SearchBar hintText={"Search for projects..."} onSearch={this.onSearch}/>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
