import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from "../../../Shared/Filters";
import SearchBar from '../../../Shared/SearchBar';
import DataSearchResult from './DataSearchResult';
import { IProjectData } from '../../../model';

interface IProjectDataManagementViewProps {
  data: IProjectData,
  projectTopics: string[]
}

const ProjectDataManagementView: React.FC<IProjectDataManagementViewProps> = props => {
    return (
      <Container fluid className='p-5'>
        <Row>
            <Col className='justify-content-center'>
              <Filters filters={props.projectTopics}/>
            </Col>

            Insert project data table.
            
        </Row>
      </Container>
    );
  }

export default ProjectDataManagementView
