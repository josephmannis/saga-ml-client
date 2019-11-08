import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { UserProject } from '../../../state/saga-home/datatypes';
import { Link } from 'react-router-dom';

interface IProjectPanelProps {
    projects: UserProject[];
    onProjectSelected: (projectID: string) => void;
    onProjectCreationRequested: () => void;
}

const style = {
    justifyContent: 'space-between'
}

const projectItem = {
    backgroundColor: 'none'
}

const ProjectPanel: React.FC<IProjectPanelProps> = props => {
    return (
         <Container fluid className=''>
             <Col className='p-0' xs>
                 <Row className='py-3 justify-content-between' noGutters>
                    <h3 className='font-weight-bold'>My Projects</h3>
                    <Button variant='link' onClick={() => props.onProjectCreationRequested()}> Create Project </Button>
                 </Row>

                <ListGroup variant='flush'>
                    {props.projects.map((item, index) => <Link to='/project'><ListGroup.Item className='text-left' style={projectItem} action key={index} onClick={() => {props.onProjectSelected(item.projectId)}}>{item.projectTitle}</ListGroup.Item></Link>)}
                </ListGroup>
             </Col>
         </Container>
    )
}

export default ProjectPanel;