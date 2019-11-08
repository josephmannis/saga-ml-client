import React from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import { UserProject, PublishedProject } from '../../state/saga-home/datatypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateProjectForm from './CreateProjectForm';

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

    toggleProjectCreation() {
        this.setState({...this.state, creatingProject: !this.state.creatingProject});
    }

    onProjectCreated(projectTitle: string, projectTopics: string[], projectDescription: string) {
        console.log(projectTitle + ' ' + projectTopics + ' ' + projectDescription);
    }

    public render() {
        return (
            <Container fluid className='p-0'>
                {this.state.creatingProject && <CreateProjectForm onFormCancelled={() => this.toggleProjectCreation()} onFormCompleted={(projectTitle: string,topics: string[], projectDescription: string) => this.onProjectCreated(projectTitle, topics, projectDescription)}/>}
                <Row noGutters className='align-content-start'>
                    <Col xs={4} className='border-right'>
                        <ProjectPanel onProjectCreationRequested={() => this.toggleProjectCreation()} projects={ this.state.userProjects } onProjectSelected ={ (projectID: string) => {this.selectProject(projectID)} }/>
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