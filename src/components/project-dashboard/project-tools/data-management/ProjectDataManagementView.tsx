import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from "../../../shared/Filters";
import { IProjectData } from '../../../clientTypes';
import { Table, Button } from 'react-bootstrap';
import { ProjectDataTable } from './ProjectDataTable';
import AddDataSourceForm from './AddDataSourceForm';

interface IProjectDataManagementViewProps {
  data: IProjectData;
  projectTopics: string[];
  onVisualizationCreated: () => void;
  onDataAdded: () => void;
}

export const ConnectedProjectDataManagementView: React.FC = () => {
  return (
    <div></div>
  )
}

const ProjectDataManagementView: React.FC<IProjectDataManagementViewProps> = props => {
  const [showDataAddedForm, toggleDataAddedForm] = React.useState(false);
  
  return (
      <Container fluid className='p-5'>
        {showDataAddedForm && <AddDataSourceForm onFormCompleted={() => toggleDataAddedForm(false)} onFormCancelled={() => toggleDataAddedForm(false)}/>}

        <Row className='pl-3 justify-content-end'>
          <Col xs='10'>
            <Row className='justify-content-between pb-5'> 
                <h2 className='font-weight-bold'> All Data </h2>
                <div>
                  <Button onClick={() => toggleDataAddedForm(true)}> Add Data </Button>
                </div>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs className='justify-content-center'>
            <Filters filters={props.projectTopics}/>
          </Col>

          <Col xs='10'>
            <ProjectDataTable data={props.data}/>
          </Col>
        </Row>
      </Container>
    );
  }

export default ProjectDataManagementView
