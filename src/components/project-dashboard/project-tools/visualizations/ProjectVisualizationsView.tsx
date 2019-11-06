import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Visualization from './Visualization';
import { IProjectVisualization } from '../../../model';

export interface IProjectVisualizationsViewProps {
  visualizations: IProjectVisualization[];
}

export default class ProjectVisualizationsView extends React.Component<IProjectVisualizationsViewProps> {
  
  public render() {
    return (
      <Container fluid className='p-5'>
          <Row>
              <Col>
               { this.getVisualizations() }
              </Col>

              <Col xs={2} sm={2} md={2} lg={2}>
                <Button className="flex" variant="primary">Create New</Button>
              </Col>
          </Row>
      </Container>
    );
  }

  getVisualizations(): Array<React.ReactFragment> {
    let children = [];

    for (let vis of this.props.visualizations) {
      children.push(<Visualization model={vis}/>);
    }
     
    return children;
  }
}
