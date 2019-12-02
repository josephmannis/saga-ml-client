import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from "../../../shared/Filters";
import { IProjectData } from '../../../clientTypes';
import { Button, Modal } from 'react-bootstrap';
import { ProjectDataTable } from './ProjectDataTable';
import AddDataSourceForm from './AddDataSourceForm';
import { useDispatch } from "react-redux";
import { DashboardActions, addDataToProject } from '../../../../state/dashboard/actions';
import InfoTooltip from '../../../global/InfoTooltip';
import { PROJECT_DATA_TOOLTIP } from '../../../../assets/strings';

interface IConnectedProjectDataManagementViewProps {
  projectId: string;
  data: IProjectData;
  projectTopics: string[];
}

const ConnectedProjectDataManagementView: React.FC<IConnectedProjectDataManagementViewProps> = props => {
  const dispatch = useDispatch();

  const onDataAdded = (columnTitles: string[], data: string[][]) => {
    dispatch(addDataToProject(props.projectId, columnTitles, data));
    console.log(data);
  }

  return (
    <ProjectDataManagementView projectId={props.projectId} data={props.data} projectTopics={props.projectTopics} onDataAdded={(columnTitles, data) => onDataAdded(columnTitles, data)} />
  )
}

interface IProjectDataManagementViewProps extends IConnectedProjectDataManagementViewProps {
  onDataAdded: (columnTitles: string[], data: string[][]) => void;
}

const ProjectDataManagementView: React.FC<IProjectDataManagementViewProps> = props => {
  const [showDataAddedForm, toggleDataAddedForm] = React.useState(false);
  
  const onDataFormCompleted = (columnTitles: string[], data: string[][]) => {
    toggleDataAddedForm(false);
    props.onDataAdded(columnTitles, data);
  }

  return (
      <Container fluid className='p-5'>
        <Modal dialogClassName='formModal' show={showDataAddedForm}>
          <Modal.Body>
              <AddDataSourceForm onFormCompleted={(columntitles, data) => onDataFormCompleted(columntitles, data)} onFormCancelled={() => toggleDataAddedForm(false)}/>
          </Modal.Body>
        </Modal>
        
        <Row className='pl-3 justify-content-end'>
          <Col xs='10'>
            <Row className='justify-content-between pb-5'> 
              <Col xs>
                <Col xs>
                  <Row className='align-items-center'>
                    <h2 className='font-weight-bold'> All Data </h2>
                    <InfoTooltip tooltipBody={PROJECT_DATA_TOOLTIP}/>
                  </Row>
                </Col>
              </Col>
                <Button onClick={() => toggleDataAddedForm(true)}> Add Data </Button>
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
