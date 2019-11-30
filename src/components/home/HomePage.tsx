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
import { Redirect } from 'react-router';


interface IHomePageProps {
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
}

const ConnectedHomePage: React.FC = () => {
    const { featuredProjects, userProjects } = useSelector((state: AppState) => state.homeReducer )

    return (<HomePage userProjects={userProjects} featuredProjects={featuredProjects}/>)
}

export const HomePage: React.FC<IHomePageProps> = props => {
    const [showProjectCreation, toggleModal] = useState(false);
    const [goToProject, redirectToProject] = useState(false);

    const selectProject = (projectID: string) => {
        console.log('selecting project' + projectID)
        redirectToProject(true);
    }

    const toggleProjectCreation = () => {
        toggleModal(!showProjectCreation);
    }
    
    return (
        <div className='p-0 h-100'>
            {goToProject && <Redirect to='/project'/>}
            {showProjectCreation && <ConnectedCreateProjectForm/>}
            <Row noGutters className='align-content-start h-100'>
                <Col xs={4} className='border-right h-100'>
                    <ProjectPanel onProjectCreationRequested={() => toggleProjectCreation()} projects={ props.userProjects } onProjectSelected = { (projectID: string) => {selectProject(projectID)} }/>
                </Col>
                <Col xs>
                    <ProjectDiscovery publishedProjects={props.featuredProjects}/>
                </Col>
            </Row>
        </div>
    )
}

export default ConnectedHomePage;