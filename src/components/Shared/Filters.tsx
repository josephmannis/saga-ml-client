import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

interface IFiltersProps {
    filters: Array<string>;
}

export default class Filters extends Component<IFiltersProps> {
    getCheckBoxes(): Array<React.ReactFragment> {
        return this.props.filters.map((data, index) => <Form.Check type='checkbox' label={data} key={index}/>);
    }

    filterStyle = {
        maxWidth: '300px',
        paddingTop: '20px',
        paddingBottom: '20px' 
    }
    
    render() {
        return (
            <Card style={this.filterStyle}>
                <Container>
                    <Col className='text-left'>
                    <h3>Filters</h3>
                        <Form>
                            {this.getCheckBoxes()}
                        </Form>
                    </Col>
                </Container>
          </Card>
        )
    }
}

