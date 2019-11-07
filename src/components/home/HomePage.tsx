import React from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import { UserProject, PublishedProject } from '../../state/saga-home/datatypes';
import Container from 'react-bootstrap/Container';


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
            featuredProjects: props.featuredProjects,
            creatingProject: false
        }
    }

    selectProject(projectID: string) {
        console.log('selecting project ${projectID}')
    }

    public render() {
        return (
            <Container>
                <ProjectPanel projects={ this.state.userProjects } onProjectSelected ={ (projectID: string) => {this.selectProject(projectID)} }/>
                <ProjectDiscovery/>
            </Container>
        );
    }
}

export default HomePage;