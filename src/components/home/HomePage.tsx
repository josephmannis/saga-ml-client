import React, { useState } from 'react';
import ProjectPanel from './project-panel/ProjectPanel';
import ProjectDiscovery from './project-discovery/ProjectDiscovery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from '../../state/store';
import { IProjectListing, IProjectDashboard } from '../clientTypes';
import ConnectedCreateProjectForm from './CreateProjectForm';
import { Redirect } from 'react-router';
import { fetchProject } from '../../state/dashboard/actions';
import { fetchPublishedProjects, fetchUserProjects } from '../../state/saga-home/actions';


interface IHomePageProps {
    userProjects: IProjectListing[];
    featuredProjects: IProjectListing[];
    onProjectSelected: (projectId: string) => void;
}

const ConnectedHomePage: React.FC = () => {
    const { featuredProjects, userProjects } = useSelector((state: AppState) => state.homeReducer )
    const dispatch = useDispatch();
    const [goToProject, redirectToProject] = useState(false);

    React.useEffect(() => {
        dispatch(fetchPublishedProjects());
        dispatch(fetchUserProjects());
    }, [])

    const onProjectSelected = (projectId: string) => {
        console.log(projectId);
        dispatch(fetchProject(projectId));
        redirectToProject(true);
    }

    return (
        <div>
            {goToProject && <Redirect to='/project'/>}
            <HomePage onProjectSelected={id => onProjectSelected(id)} userProjects={userProjects} featuredProjects={featuredProjects}/>
        </div>
    )
}


export const HomePage: React.FC<IHomePageProps> = props => {
    const [showProjectCreation, toggleModal] = useState(false);

    const toggleProjectCreation = () => {
        toggleModal(!showProjectCreation);
    }

    const onProjectSelected = (id: string) => {
        props.onProjectSelected(id);
    }
    
    return (
        <div className='p-0 h-100'>
            {showProjectCreation && <ConnectedCreateProjectForm/>}
            <Row noGutters className='align-content-start h-100'>
                <Col xs={4} className='border-right h-100'>
                    <ProjectPanel onProjectCreationRequested={() => toggleProjectCreation()} projects={ props.userProjects } onProjectSelected = { id => onProjectSelected(id) }/>
                </Col>
                <Col xs>
                    <ProjectDiscovery onProjectSelected={id => onProjectSelected(id)} publishedProjects={props.featuredProjects}/>
                </Col>
            </Row>
        </div>
    )
}

export default ConnectedHomePage;