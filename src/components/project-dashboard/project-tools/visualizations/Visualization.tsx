import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Line, Pie} from 'react-chartjs-2';
import {IProjectData, IProjectVisualization, IProjectVisualizationType} from '../../../clientTypes';
import {formatDataForVis} from "./utility";

interface IVisualizationProps {
    vis: IProjectVisualization;
    data: IProjectData;
}

const Visualization: React.FC<IVisualizationProps> =
  ({vis, data}) => {

  const formattedData = formatDataForVis(data, vis);
    console.log(formattedData);

  const lineChart = (
    <Line data={formattedData} width={100} height={100} options={{
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
  );

  const pieChart = (
    <Pie data={formattedData} width={100} height={100} options={{}}>
    </Pie>
  );

  return (
    <Container className='my-5' fluid>
      <Row>
        <Col xs={5} sm={5} md={5} lg={5} >
          {vis.type === IProjectVisualizationType.LINE ? lineChart : pieChart }
          </Col>

          <Col className='text-left'>
            <h2>{vis.title}</h2>
            <p>{vis.description}</p>
          </Col>
        </Row>
      </Container>
    )

};

export default Visualization;