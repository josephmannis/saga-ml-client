import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Visualization from './Visualization';
import ProjectVisualizationCreationForm from './ProjectVisualizationCreationForm';
import {IProjectData, IProjectVisualization} from '../../../clientTypes';
import {useDispatch} from "react-redux";
import {DashboardActions} from "../../../../state/dashboard/actions";

interface IConnectedProjectVisualizationsViewProp {
  data: IProjectData;
  visualizations: IProjectVisualization[];

}

const ConnectedProjectVisualizationsView: React.FC<IConnectedProjectVisualizationsViewProp> = props => {
  const dispatch = useDispatch();

  const onVisualizationAdded = (visualization: IProjectVisualization) => {
    const newVisualization = {
      type: DashboardActions.ADD_VISUALIZATION,
      projectId: 'fake rn',
      newVisualization: visualization
    };

    dispatch(newVisualization);
    console.log(visualization);
  };

  return (
    <ProjectVisualizationsView data={props.data}
                               visualizations={props.visualizations}
                               onVisualizationAdded={visualization => onVisualizationAdded(visualization)} />
  )
};

export interface IProjectVisualizationsViewProps extends IConnectedProjectVisualizationsViewProp{
  onVisualizationAdded: (visualization: IProjectVisualization) => void;
}

const ProjectVisualizationsView: React.FC<IProjectVisualizationsViewProps> = props => {
  const { data } = props;
  const [showVisualizationCreation, toggleVisualizationCreation] = React.useState(false);

  const onVisualizationFormCompleted = (visualization: IProjectVisualization) => {
    toggleVisualizationCreation(false);
    props.onVisualizationAdded(visualization);
  };

  return (
    <Container fluid className='p-5'>
      {showVisualizationCreation && <ProjectVisualizationCreationForm data={data}
                                                                      onFormCompleted={onVisualizationFormCompleted}
                                                                      onVisualizationCreationCancelled={() => toggleVisualizationCreation(false) }/>}
      <Row>
          <Col>
            { props.visualizations.map((vis, i) => <Visualization key={i} vis={vis} data={data}/>) }
          </Col>

          <Col xs={2} sm={2} md={2} lg={2}>
            <Button onClick={() => toggleVisualizationCreation(true)} className="flex" variant="primary">Create New</Button>
          </Col>
      </Row>
    </Container>
  );
}

export default ConnectedProjectVisualizationsView;