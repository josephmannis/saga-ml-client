import React, { useState } from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from "react-redux";
import { AppState } from '../../state/store';
import { IProjectListing } from '../clientTypes';
import ConnectedCreateProjectForm from './CreateProjectForm';


interface IHomePageProps {
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
}

interface IHomePageState {
    showProjectCreation: boolean;
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
}

const ConnectedHomePage: React.FC = () => {
    const { featuredProjects, userProjects } = useSelector((state: AppState) => state.homeReducer )

    console.log('user projects in connector')
    console.log(userProjects)

    return (
        <div>
        <p> {userProjects.length} </p>
        <HomePage userProjects={userProjects} featuredProjects={featuredProjects}/>
        </div>
    )
}


export const HomePage: React.FC<IHomePageProps> = props => {
    const [showProjectCreation, toggleModal] = useState(false);

    const selectProject = (projectID: string) => {
        console.log('selecting project' + projectID)
    }

    const toggleProjectCreation = () => {
        toggleModal(!showProjectCreation);
    }
    
    return (
        <Container fluid className='p-0'>
                {showProjectCreation && <ConnectedCreateProjectForm/>}

                <Row noGutters className='align-content-start'>
                    <Col xs={4} className='border-right'>
                        <ProjectPanel onProjectCreationRequested={() => toggleProjectCreation()} projects={ props.userProjects } onProjectSelected = { (projectID: string) => {selectProject(projectID)} }/>
                    </Col>
                    <Col xs>
                        <ProjectDiscovery publishedProjects={props.featuredProjects}/>
                    </Col>
                </Row>
        </Container>
    )
}

export default ConnectedHomePage;