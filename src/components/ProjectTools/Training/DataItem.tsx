import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataItemModel from './model/DataItemModel';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

interface IDataItemProps {
    model: DataItemModel;
}

const DataItem: React.FC<IDataItemProps> =
 ({model}) => (
    <Card>
        <Container fluid className='p-3'>
            <Row>
                <Col xs={8} sm={8} md={8} lg={8} className='text-left'>
                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <h6>Type: </h6>
                        </Col>
                        <Col>
                            <p>{model.type}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <h6>Date: </h6>
                        </Col>
                        <Col>
                            <p>{model.date.toDateString}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <h6>Description: </h6>
                        </Col>
                        <Col>
                            <p>{model.content}</p>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    {model.tags.map(tag => <Badge className='m-2' variant='dark'>{tag}</Badge>)}
                </Col>
            </Row>
        </Container>
     </Card>
)  

export default DataItem
