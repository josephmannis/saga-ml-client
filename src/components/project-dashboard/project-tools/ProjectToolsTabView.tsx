import * as React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { IProjectDashboard } from '../../clientTypes';
import ConnectedProjectDataManagementView from './data-management/ProjectDataManagementView';
import { ConnectedProjectCommentView } from './project-comments/ProjectCommentView';
import ConnectedProjectVisualizationsView from './visualizations/ProjectVisualizationsView';


interface IProjectToolsTabViewProps {
    project: IProjectDashboard;
}

enum ProjectToolActions {
    VISUALIZE = "Visualize",
    ADD_DATA = "Add Data",
    TRAIN = "Train",
    COMMENT = "Comment"
}

const ProjectToolsTabView: React.FC<IProjectToolsTabViewProps> = props => {    
    return (
        <Tabs defaultActiveKey={ProjectToolActions.ADD_DATA} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ConnectedProjectVisualizationsView  data={ props.project.data }
                                                     visualizations={props.project.visualizations} />
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                {console.log(props.project.data)}
                <ConnectedProjectDataManagementView projectId={props.project.id} data={ props.project.data } projectTopics={ props.project.topics } />
            </Tab>
            <Tab eventKey={ProjectToolActions.COMMENT} title={ProjectToolActions.COMMENT}> 
                <ConnectedProjectCommentView comments={props.project.comments}/>
            </Tab>
        </Tabs>
    )
}


export default ProjectToolsTabView;