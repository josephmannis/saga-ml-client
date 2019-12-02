import React from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import line from '../../../../assets/linesample.svg';
import pie from '../../../../assets/piesample.svg';
import { IProjectVisualizationType } from '../../../clientTypes';

interface ISearchDataSourceFormProps {
  setChartType: (chartType: number) => void;
  selectedType: IProjectVisualizationType;
}

const TypeOfVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
  const {setChartType, selectedType} = props;

  const imagePreview = {
    height: '70%',
    width: '70%'
  }
  
  return (
    <Container fluid>
      <Col xs>
        <Row className='justify-content-center'>
          <Col xs>
            <Card border={selectedType === IProjectVisualizationType.LINE ? 'primary' : undefined} onClick={() => setChartType(IProjectVisualizationType.LINE)}>
              <Card.Body>
                <Col xs>
                  <Row className='justify-content-center'>
                    <img style={imagePreview} className='p-3' src={line} alt='Line Chart Preview'/>
                  </Row>
                  <h4 className='font-weight-bold'>Line Chart</h4>
                  <p>Good for visualizing change over time.</p>
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col xs>
            <Card border={selectedType === IProjectVisualizationType.PIE ? 'primary' : undefined} onClick={() => setChartType(IProjectVisualizationType.PIE)}>
              <Card.Body>
                <Row className='justify-content-center'>
                  <img style={imagePreview} className='p-3' src={pie} alt='Pie Chart Preview'/>
                </Row>
                <h4 className='font-weight-bold'>Pie Chart</h4>
                <p>Good for visualizing type distributions.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default TypeOfVisualizationForm;