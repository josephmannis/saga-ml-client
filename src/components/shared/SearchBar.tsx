import React from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';
import {Form, Input} from '@rocketseat/unform';


interface SearchBarProps {
    hintText: string; 
    onSearch: (data: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    return (
        <Form onSubmit={(data) => props.onSearch(data.query)}>
            <InputGroup>
                    <Input className='form-control' name='query' placeholder={props.hintText} />
                <InputGroup.Append>
                    <Button type='submit' variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default SearchBar;
