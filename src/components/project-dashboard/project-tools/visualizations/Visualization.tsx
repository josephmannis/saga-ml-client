import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {DataPoint, IVisualization} from "../../../../state/dashboard/datatypes";
import { Line } from 'react-chartjs-2';

interface IVisualizationProps {
    model: IVisualization;
    dataPoints: DataPoint[];
}

const Visualization: React.FC<IVisualizationProps> =
  ({model, dataPoints}) => {
    let emptyTagToDataSet: { [key: string]: {data: {t: Date; y: number}[]; label:string;} } = {};
    emptyTagToDataSet = model.tagsToInclude.reduce((acc , cur) => {
      acc[cur] = {
        data: [],
        label: cur,
      };
      return acc;
    }, emptyTagToDataSet);
  const tagToDataSet = dataPoints.reduce((acc, curDataPoint) => {
    curDataPoint.tags.forEach(curTag => {
      if (model.tagsToInclude.includes(curTag)) {
        acc[curTag].data.push({t: curDataPoint.timeStamp, y: 1})
      }
    });
    return acc;
  }, emptyTagToDataSet);

  const datasetsToInclude = Object.values(tagToDataSet);//.filter(cur => model.tagsToInclude.includes(cur.label));

  const data = {
    datasets: datasetsToInclude
  };

  if (model.type == 'line') {
    return (
      <Container fluid>
        <Row>
          <Col xs={5} sm={5} md={5} lg={5} >
              <Line data={data} width={100} height={100} options={{
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'month'
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
