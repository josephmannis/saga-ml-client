import React from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import { UserProject, PublishedProject } from '../../state/saga-home/datatypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IHomePageProps {
    userProjects: UserProject[];
    featuredProjects: PublishedProject[];
}

interface IHomePageState {
    userProjects: UserProject[];
    featuredProjects: PublishedProject[];
    creatingProject: boolean;
}


class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            userProjects: props.userProjects,
            featuredProjects: [...props.featuredProjects, {projectId: 'fake', projectTitle: 'Donal Tromp twwet', coverImageUrl: 'nah', topics: []}],
            creatingProject: false
        }
    }
    

    selectProject(projectID: string) {
        console.log('selecting project' + projectID)
    }

    public render() {
        return (
            <Container fluid className='p-0'>
                <Row noGutters className='align-content-start'>
                    <Col xs={4} className='border-right'>
                        <ProjectPanel projects={ this.state.userProjects } onProjectSelected ={ (projectID: string) => {this.selectProject(projectID)} }/>
                    </Col>
                    <Col xs>
                        <ProjectDiscovery publishedProjects={this.state.featuredProjects}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HomePage;