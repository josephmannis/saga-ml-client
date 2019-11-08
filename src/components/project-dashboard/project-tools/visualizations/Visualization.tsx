import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {DataPoint, IVisualization} from "../../../../state/dashboard/datatypes";
import {Line} from 'react-chartjs-2';

interface IVisualizationProps {
  model: IVisualization;
  dataPoints: DataPoint[];
}

function randomColor(): string {
  return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6); //https://stackoverflow.com/a/1152508
}

const Visualization: React.FC<IVisualizationProps> =
  ({model, dataPoints}) => {


    let emptyTagToDataSet: { [key: string]: { data: { [date: string]: { t: Date; y: number; } }; label: string; borderColor: string; } } = {};
    emptyTagToDataSet = model.tagsToInclude.reduce((acc, cur) => {
      acc[cur] = {
        data: {},
        label: cur,
        borderColor: randomColor(),
      };
      return acc;
    }, emptyTagToDataSet);

    const tagToDataSet = dataPoints.reduce((acc, curDataPoint) => {
      curDataPoint.tags.forEach(curTag => {
        const curTS = curDataPoint.timeStamp;
        const dateKey = curTS.getFullYear() + "-" + curTS.getMonth();
        if (model.tagsToInclude.includes(curTag)
          && curTS.getTime() < model.endTime.getTime()
          && curTS.getTime() > model.startTime.getTime()) {
          if (!acc[curTag].data[dateKey]) {
            acc[curTag].data[dateKey] = {t: curDataPoint.timeStamp, y: 0};
          }
          acc[curTag].data[dateKey] = {...acc[curTag].data[dateKey], y: acc[curTag].data[dateKey].y + 1}
        }
      });
      return acc;
    }, emptyTagToDataSet);

    const datasetsToInclude = Object.values(tagToDataSet)
      .map(cur => {
        return {...cur, data: Object.values(cur.data)}
      });
    datasetsToInclude
      .forEach(cur => {
        cur.data.sort((a, b) => b.t.getTime() - a.t.getTime())
      });

    const data = {
      datasets: datasetsToInclude
    };

    if (model.type == 'line') {
      return (
        <Container fluid>
          <Row>
            <Col xs={5} sm={5} md={5} lg={5}>
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
  }


export default Visualization
