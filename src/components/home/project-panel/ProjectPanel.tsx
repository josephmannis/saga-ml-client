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

const style = {
    justifyContent: 'space-between',
    padding: '1em 0',
}

const projectItem = {
    backgroundColor: 'none'
}

const ProjectPanel: React.FC<IProjectPanelProps> = props => {
    return (
         <Container fluid className=''>
             <Col className='p-0' xs>
                 <Row style={style} noGutters>
                    <h2>My Projects</h2>
                    <Button onClick={() => {console.log('create project')}}> + </Button>
                 </Row>

                <ListGroup variant='flush'>
                    {props.projects.map((item, index) => <ListGroup.Item className='text-left' style={projectItem} action key={index} onClick={() => {props.onProjectSelected(item.projectId)}}>{item.projectTitle}</ListGroup.Item>)}
                </ListGroup>
             </Col>
         </Container>
    )
}

export default ProjectPanel;