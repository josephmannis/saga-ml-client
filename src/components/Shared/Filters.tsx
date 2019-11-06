import React, { Component } from './node_modules/react';
import Container from './node_modules/react-bootstrap/Container';
import Col from './node_modules/react-bootstrap/Col';
import Form from './node_modules/react-bootstrap/Form';
import Card from './node_modules/react-bootstrap/Card';

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

