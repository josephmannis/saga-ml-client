import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Visualization from './Visualization';
import ProjectVisualizationCreationFlow from './ProjectVisualizationCreationFlow';
import { IProjectVisualization } from '../../../clientTypes';

export interface IProjectVisualizationsViewProps {
  visualizations: IProjectVisualization[];
  onVisualizationCreated: () => void;
}

const ProjectVisualizationsView: React.FC<IProjectVisualizationsViewProps> = props => {
  const [showVisualizationCreation, toggleVisualizationCreation] = React.useState(false);

  return (
    <Container fluid className='p-5'>
      {showVisualizationCreation && <ProjectVisualizationCreationFlow onVisualiationCreated={() => props.onVisualizationCreated() } onVisualizationCreationCancelled={() => toggleVisualizationCreation(false) }/>}
      <Row>
          <Col>
            { props.visualizations.map((vis, i) => <Visualization key={i} model={vis}/>) }
          </Col>

          <Col xs={2} sm={2} md={2} lg={2}>
            <Button onClick={() => toggleVisualizationCreation(true)} className="flex" variant="primary">Create New</Button>
          </Col>
      </Row>
    </Container>
  );
}

export default ProjectVisualizationsView;