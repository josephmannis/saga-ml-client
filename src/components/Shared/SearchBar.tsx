import React from './node_modules/react';
import InputGroup from './node_modules/react-bootstrap/InputGroup';
import Button from './node_modules/react-bootstrap/Button';
import FormControl from './node_modules/react-bootstrap/FormControl';

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
