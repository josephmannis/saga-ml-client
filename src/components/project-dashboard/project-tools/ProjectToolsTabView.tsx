import * as React from 'react';
import ProjectDataManagementView from './data-management/ProjectDataManagementView';
import ProjectVisualizationsView from './visualizations/ProjectVisualizationsView';
import { DashboardState } from '../../../state/dashboard/reducers';
import { Tabs, Tab } from 'react-bootstrap';
import {ProjectDashboard} from "../../../state/dashboard/datatypes";

export interface IProjectToolsTabViewProps {
    dashBoard: DashboardState
}


interface IProjectToolsTabViewState {
    project: ProjectDashboard;
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
            project: props.dashBoard.project,
            currentTab: ProjectToolActions.VISUALIZE,
        }
    }

    public render() {
        return (
            <Tabs defaultActiveKey={ProjectToolActions.ADD_DATA} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ProjectVisualizationsView visualizations={this.props.dashBoard.project.visualizations} dataPoints={this.props.dashBoard.project.dataPoints}/>
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                <ProjectDataManagementView dataPoints={ this.props.dashBoard.project.dataPoints } projectTopics={ this.props.dashBoard.project.topics } />
            </Tab>
        </Tabs>
        )
    }
}

export default ProjectToolsTabView;