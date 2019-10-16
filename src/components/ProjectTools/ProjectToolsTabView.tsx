import * as React from 'react';
import Tabs from 'react-bootstrap/tabs';
import Tab from 'react-bootstrap/tab';
import ProjectDataManagementView from './ProjectDataManagementView';
import ProjectVisualizationsView from './ProjectVisualizations/ProjectVisualizationsView';
import ProjectTrainingView from './ProjectTrainingView';
import ProjectVisualizationModel from './ProjectVisualizations/model/ProjectVisualizationModel';

export interface IProjectToolsTabViewProps {

}

enum ProjectToolActions {
    VISUALIZE = "Visualize",
    ADD_DATA = "Add Data",
    TRAIN = "Train"
}

export default class ProjectToolsTabView extends React.Component<IProjectToolsTabViewProps> {
  public render() {
    return (
        <Tabs defaultActiveKey={ProjectToolActions.VISUALIZE} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ProjectVisualizationsView visualizations={this.getVisualizations()}/>
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                <ProjectDataManagementView/>
            </Tab>
            <Tab eventKey={ProjectToolActions.TRAIN} title={ProjectToolActions.TRAIN}>
                <ProjectTrainingView/>
            </Tab>
        </Tabs>
    );
  }

  getVisualizations() {
      return [
          new ProjectVisualizationModel(
          "~/assets/graph.svg",
          "Distribution of Data", 
          "Lorem")
        ];
  }
}
