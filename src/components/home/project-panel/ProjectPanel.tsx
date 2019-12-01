import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { IProjectListing } from '../../clientTypes';
import InfoTooltip from '../../global/InfoTooltip';
import { PROJECTS_TOOLTIP } from '../../../assets/strings';

interface IProjectPanelProps {
    projects: IProjectListing[];
    onProjectSelected: (projectID: string) => void;
    onProjectCreationRequested: () => void;
}

const projectItem = {
    backgroundColor: 'none'
}

const ProjectPanel: React.FC<IProjectPanelProps> = props => {
    return (
         <Container fluid className=''>
             <Col className='p-0' xs>
                 <Row className='py-3 justify-content-between' noGutters>
                     <Col xs>
                         <Col xs>
                             <Row className='align-items-center'>
                                <h3 className='font-weight-bold'>My Projects</h3>
                                <InfoTooltip tooltipBody={PROJECTS_TOOLTIP}/>
                             </Row>
                         </Col>
                     </Col>
                    <Button variant='link' onClick={() => props.onProjectCreationRequested()}> Create Project </Button>
                 </Row>

                <ListGroup variant='flush'>
                    {props.projects.map((item, index) => <ListGroup.Item className='text-left' style={projectItem} action key={index} onClick={() => {props.onProjectSelected(item.id)}}>{item.title}</ListGroup.Item>)}
                </ListGroup>
             </Col>
         </Container>
    )
}

export default ProjectPanel;