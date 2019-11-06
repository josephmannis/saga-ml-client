import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IProjectVisualization } from '../../../model';

interface IVisualizationProps {
    model: IProjectVisualization;
}

const Visualization: React.FC<IVisualizationProps> =
 ({model}) => (
     <Container fluid>
         <Row>
             <Col xs={5} sm={5} md={5} lg={5} >
                <Image src={require('../../../../assets/graph.svg')}/>
             </Col>

            <Col className='text-left'>
                <h2>{model.title}</h2>
                <p>{model.description}</p>    
            </Col>
         </Row>
     </Container>
)  

export default Visualization
