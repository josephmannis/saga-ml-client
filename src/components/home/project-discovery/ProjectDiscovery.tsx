import React from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import { PublishedProject } from '../../../state/saga-home/datatypes';
import ProjectPreview from './ProjectPreview';

interface IProjectDiscoveryProps {
    publishedProjects: PublishedProject[];
}

interface IProjectDiscoveryState {

}

const projectsContainer = {
    justifyContent: 'flex-end'
}

class ProjectDiscovery extends React.Component<IProjectDiscoveryProps, IProjectDiscoveryState> {
    public render() {
        return (
            <Container fluid className={'pt-3'}>
                <Row className='justify-content-end'>
                    <Col xs='11'>
                        <Row className='justify-content-start'>
                            <Col xs>
                                <Row className='justify-content-start'>
                                    <h3 className='font-weight-bold mb-5'>Browse Projects</h3>
                                </Row>

                                <Row className='justify-content-between'>
                                    <CardColumns>
                                        {this.props.publishedProjects.map((item, i) => <ProjectPreview imageUrl={'https://via.placeholder.com/150'} title={item.projectTitle} description={'Fake description'}/> )}
                                    </CardColumns>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProjectDiscovery;