import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from "../../../shared/Filters";
import { IProjectData } from '../../../clientTypes';
import { Button, Modal } from 'react-bootstrap';
import { ProjectDataTable } from './ProjectDataTable';
import AddDataSourceForm from './AddDataSourceForm';

interface IConnectedProjectDataManagementViewProps {
  data: IProjectData;
  projectTopics: string[];
}

const ConnectedProjectDataManagementView: React.FC<IConnectedProjectDataManagementViewProps> = props => {
  const onDataAdded = (data: any) => {
    console.log(data);
  }

  return (
    <ProjectDataManagementView data={props.data} projectTopics={props.projectTopics} onDataAdded={data => onDataAdded(data)} />
  )
}

interface IProjectDataManagementViewProps extends IConnectedProjectDataManagementViewProps {
  onDataAdded: (data: any) => void;
}

const ProjectDataManagementView: React.FC<IProjectDataManagementViewProps> = props => {
  const [showDataAddedForm, toggleDataAddedForm] = React.useState(false);
  
  const onDataFormCompleted = (data: any) => {
    toggleDataAddedForm(false);
    props.onDataAdded(data);
  }

  return (
      <Container fluid className='p-5'>
        <Modal dialogClassName='formModal' show={showDataAddedForm}>
          <Modal.Body>
              <AddDataSourceForm onFormCompleted={(data) => onDataFormCompleted(data)} onFormCancelled={() => toggleDataAddedForm(false)}/>
          </Modal.Body>
        </Modal>
        
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

export default ConnectedProjectDataManagementView
