
import React from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

interface SearchBarProps {
    hintText: string; 
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder={props.hintText}
                aria-label={props.hintText}
                aria-describedby="basic-addon2"
            />
        
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    )
}

export default SearchBar;
