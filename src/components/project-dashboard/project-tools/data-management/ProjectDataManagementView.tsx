import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from "../../../shared/Filters";
import {DataPoint} from "../../../../state/dashboard/datatypes";

interface IProjectDataManagementViewProps {
  dataPoints: DataPoint[],
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
            List Length: {props.dataPoints.length}
            Item1: {props.dataPoints[0] && JSON.stringify(props.dataPoints[0])}

        </Row>
      </Container>
    );
  }

export default ProjectDataManagementView
