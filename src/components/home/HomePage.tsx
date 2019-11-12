import React from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from '../../state/store';
import { IProjectListing } from '../clientTypes';


interface IHomePageProps {
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
}

interface IHomePageState {
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
}

const ConnectedHomePage: React.FC = () => {
    const { featuredProjects, userProjects } = useSelector((state: AppState) => state.homeReducer )
    const dispatch = useDispatch();
    
    return (
        <HomePage userProjects={userProjects} featuredProjects={featuredProjects}/>
    )
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            userProjects: props.userProjects,
            featuredProjects: [...props.featuredProjects, {id: 'fake', title: 'Donal Tromp twwet', coverImageUrl: 'nah', description: 'woo', topics: [], ownerId: 'no'}],
        }
    }
    
    selectProject(projectID: string) {
        console.log('selecting project' + projectID)
    }

    toggleProjectCreation() {
        console.log('Create project');
    }

    onProjectCreated(projectTitle: string, projectTopics: string[], projectDescription: string) {
        console.log(projectTitle + ' ' + projectTopics + ' ' + projectDescription);
    }

    public render() {
        return (
            <Container fluid className='p-0'>
                <Row noGutters className='align-content-start'>
                    <Col xs={4} className='border-right'>
                        <ProjectPanel onProjectCreationRequested={() => this.toggleProjectCreation()} projects={ this.state.userProjects } onProjectSelected = { (projectID: string) => {this.selectProject(projectID)} }/>
                    </Col>
                    <Col xs>
                        <ProjectDiscovery publishedProjects={this.state.featuredProjects}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ConnectedHomePage;