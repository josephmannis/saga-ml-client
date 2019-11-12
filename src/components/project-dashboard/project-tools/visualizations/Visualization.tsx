import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Line } from 'react-chartjs-2';
import { IProjectVisualization, IVisualizationDataPoint, IProjectVisualizationType } from '../../../clientTypes';

interface IVisualizationProps {
    model: IProjectVisualization;
    dataPoints: IVisualizationDataPoint[];
}

const Visualization: React.FC<IVisualizationProps> =
  ({model, dataPoints}) => {
    let emptyTagToDataSet: { [key: string]: {data: {[date: string]: {t: Date; y: number}}; label:string;} } = {};
    emptyTagToDataSet = model.labels.reduce((acc , cur) => {
      acc[cur] = {
        data: {},
        label: cur,
      };
      return acc;
    }, emptyTagToDataSet);

  const tagToDataSet = dataPoints.reduce((acc, curDataPoint) => {
    curDataPoint.tags.forEach(curTag => {
      const dateKey = curDataPoint.timeStamp.getFullYear() + "-" + curDataPoint.timeStamp.getDate();
      if (model.labels.includes(curTag)) {
        if (!acc[curTag].data[dateKey]) {
          acc[curTag].data[dateKey] = {t: curDataPoint.timeStamp, y: 1}
        }
        acc[curTag].data[dateKey] = {t: curDataPoint.timeStamp, y: acc[curTag].data[dateKey].y + 1}
      }
    });
    return acc;
  }, emptyTagToDataSet);

  const datasetsToInclude = Object.values(tagToDataSet)
    .map(cur => {return {data: Object.values(cur.data), label: cur.label}});
  datasetsToInclude
    .forEach(cur => {cur.data.sort((a, b) => b.t.getTime() - a.t.getTime())});

console.log(datasetsToInclude);
  const data = {
    datasets: datasetsToInclude
  };

  if (model.type === IProjectVisualizationType.LINE) {
    return (
      <Container fluid>
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
             <Col xs={5} sm={5} md={5} lg={5} >
                <Image src={require('../../../../assets/graph.svg')}/>
             </Col>

            <Col className='text-left'>
                <h2>{model.title}</h2>
                <p>{model.description}</p>    
            </Col>
         </Row>
     </Container>
)  }


export default Visualization
