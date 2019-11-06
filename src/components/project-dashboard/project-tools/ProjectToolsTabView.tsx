import * as React from 'react';
import Tabs from 'react-bootstrap/tabs';
import Tab from 'react-bootstrap/tab';
import ProjectDataManagementView from './data-management/ProjectDataManagementView';
import ProjectVisualizationsView from './visualizations/ProjectVisualizationsView';
import { IProject } from '../../model';

export interface IProjectToolsTabViewProps {
    project: IProject
}


interface IProjectToolsTabViewState {
    project: IProject;
    currentTab: ProjectToolActions;
}

enum ProjectToolActions {
    VISUALIZE = "Visualize",
    ADD_DATA = "Add Data",
    TRAIN = "Train"
}


class ProjectToolsTabView extends React.Component<IProjectToolsTabViewProps, IProjectToolsTabViewState> {
    constructor(props: IProjectToolsTabViewProps) {
        super(props);
        this.state = {
            project: props.project,
            currentTab: ProjectToolActions.VISUALIZE,
        }
    }

    public render() {
        return (
            <Tabs defaultActiveKey={ProjectToolActions.ADD_DATA} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ProjectVisualizationsView visualizations={this.props.project.visualizations}/>
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                <ProjectDataManagementView data={ this.props.project.data } projectTopics={ this.props.project.topics } />
            </Tab>
        </Tabs>
        )
    }
}

export default ProjectToolsTabView;