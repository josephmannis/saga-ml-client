import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Line} from 'react-chartjs-2';
import { IProjectVisualization, IVisualizationDataPoint, IProjectVisualizationType } from '../../../clientTypes';
import dataTransform from "./utility";

interface IVisualizationProps {
    model: IProjectVisualization;
}

function randomColor(): string {
  return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6); //https://stackoverflow.com/a/1152508
}

const Visualization: React.FC<IVisualizationProps> =
  ({model}) => {

  const data = dataTransform({columnTitles: [], dataRows: []});

  if (model.type === IProjectVisualizationType.LINE) {
    return (
      <Container className='my-5' fluid>
        <Row>
          <Col xs={5} sm={5} md={5} lg={5} >
              <Line data={data} width={100} height={100} options={{
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'month',
                      round: 'month'
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }}>
              </Line>
            </Col>

            <Col className='text-left'>
              <h2>{model.title}</h2>
              <p>{model.description}</p>
            </Col>
          </Row>
        </Container>
      )
    }

    return (
      <Container fluid>
        <Row>
          <Col xs={5} sm={5} md={5} lg={5}>
            <Image src={require('../../../../assets/graph.svg')}/>
          </Col>

          <Col className='text-left'>
            <h2>{model.title}</h2>
            <p>{model.description}</p>
          </Col>
        </Row>
      </Container>
    )
};

export default Visualization;