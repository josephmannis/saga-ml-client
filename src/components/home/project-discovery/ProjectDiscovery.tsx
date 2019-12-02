import React from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import ProjectPreview from './ProjectPreview';
import { Link } from 'react-router-dom';
import { IProjectListing } from '../../clientTypes';
import InfoTooltip from '../../global/InfoTooltip';
import { BROWSE_PROJECTS_TOOLIP } from '../../../assets/strings';

interface IProjectDiscoveryProps {
    publishedProjects: IProjectListing[];
    onProjectSelected: (projectId: string) => void;
}

const ProjectDiscovery: React.FC<IProjectDiscoveryProps> = props => {
    return (
        <Container fluid className={'pt-3'}>
            <Row className='justify-content-end'>
                <Col xs>
                    <Row className='justify-content-start'>
                        <Col xs>
                            <Row className='justify-content-start align-content-center'>
                                <h3 className='font-weight-bold mb-5'>Browse Projects</h3>
                                <InfoTooltip tooltipBody={BROWSE_PROJECTS_TOOLIP}/>
                            </Row>

                            <Row className='justify-content-between'>
                                <CardColumns>
                                    {props.publishedProjects.map((item, i) => <ProjectPreview projectId={item.id} onProjectSelected={(id: string) => props.onProjectSelected(id)} key={i} imageUrl={'https://via.placeholder.com/150'} title={item.title} description={item.description}/>)}
                                </CardColumns>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectDiscovery;