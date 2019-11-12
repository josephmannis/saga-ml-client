import * as React from 'react';
import ProjectDataManagementView from './data-management/ProjectDataManagementView';
import ProjectVisualizationsView from './visualizations/ProjectVisualizationsView';
import { Tabs, Tab } from 'react-bootstrap';
import { IProjectDashboard } from '../../clientTypes';


interface IProjectToolsTabViewProps {
    project: IProjectDashboard;
    onVisualizationCreated: () => void;
    onDataAdded: () => void;
}

enum ProjectToolActions {
    VISUALIZE = "Visualize",
    ADD_DATA = "Add Data",
    TRAIN = "Train"
}

const ProjectToolsTabView: React.FC<IProjectToolsTabViewProps> = props => {    
    return (
        <Tabs defaultActiveKey={ProjectToolActions.ADD_DATA} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ProjectVisualizationsView visualizations={props.project.visualizations} onVisualizationCreated={() => props.onVisualizationCreated() }/>
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                {/* <ProjectDataManagementView dataPoints={ props.project.dataPoints } projectTopics={ props.project.topics } /> */}
            </Tab>
        </Tabs>
    )
}


export default ProjectToolsTabView;