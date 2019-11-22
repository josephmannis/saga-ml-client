import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { IProjectDashboard } from '../../clientTypes';
import ConnectedProjectDataManagementView from './data-management/ProjectDataManagementView';
import ConnectedProjectVisualizationsView from './visualizations/ProjectVisualizationsView';


interface IProjectToolsTabViewProps {
    project: IProjectDashboard;
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
                <ConnectedProjectVisualizationsView visualizations={props.project.visualizations} />
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                <ConnectedProjectDataManagementView data={ props.project.data } projectTopics={ props.project.topics } />
            </Tab>
        </Tabs>
    )
}


export default ProjectToolsTabView;