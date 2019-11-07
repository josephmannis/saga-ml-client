import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { UserProject } from '../../../state/saga-home/datatypes';

interface IProjectPanelProps {
    projects: UserProject[];
    onProjectSelected: (projectID: string) => void;
}

const ProjectPanel: React.FC<IProjectPanelProps> = props => {
    return (
         <Container fluid className='p-5'>
             <Col xs={10} sm={10} md={10} lg={10} className='justify-content-start align-content-start' >
                 <Row className='space-between'>
                    <h2>My Projects</h2>
                    <Button onClick={() => {console.log('create project')}}> + </Button>
                 </Row>

                <ListGroup variant='flush'>
                    {props.projects.map(item => <ListGroup.Item onClick={() => {props.onProjectSelected(item.projectId)}}>{item.projectTitle}</ListGroup.Item>)}
                </ListGroup>
             </Col>
         </Container>
    )
}

export default ProjectPanel;