import * as React from './node_modules/react';
import Container from './node_modules/react-bootstrap/Container';
import Row from './node_modules/react-bootstrap/Row';
import Col from './node_modules/react-bootstrap/Col';
import Button from './node_modules/react-bootstrap/Button';
import ProjectVisualizationModel from './model/ProjectVisualizationModel';
import Visualization from './Visualization';

export interface IProjectVisualizationsViewProps {
  visualizations: Array<ProjectVisualizationModel>;
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
