import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

interface IDataSearchResultProps {
    title: string;
    description: string;
    tags: Array<string>;
}


const DataSearchResult: React.FC<IDataSearchResultProps> =
 ({title, description, tags}) => (
     <Card className='p-3'>
        <Container fluid>
            <Row>
                <Col xs={10} sm={10} md={10} lg={10} className='text-left'>
                    <h2>{title}</h2>
                    <p>{description}</p>    
                </Col>
    
                <Col>
                    {tags.map(tag => <Badge variant='dark'>{tag}</Badge>)}
                </Col>
            </Row>
        </Container>
     </Card>
)  

export default DataSearchResult
