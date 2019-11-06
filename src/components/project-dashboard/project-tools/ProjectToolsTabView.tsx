import * as React from 'react';
import Tabs from 'react-bootstrap/tabs';
import Tab from 'react-bootstrap/tab';
import ProjectDataManagementView from './data-management/ProjectDataManagementView';
import ProjectVisualizationsView from './visualizations/ProjectVisualizationsView';
import ProjectTrainingView from './training/ProjectTrainingView';
import ProjectVisualizationModel from './visualizations/model/ProjectVisualizationModel';
import DataItemModel from './training/model/DataItemModel';

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
        <Tabs defaultActiveKey={ProjectToolActions.ADD_DATA} id="project-tool-actions">
            <Tab eventKey={ProjectToolActions.VISUALIZE} title={ProjectToolActions.VISUALIZE}>
                <ProjectVisualizationsView visualizations={this.getVisualizations()}/>
            </Tab>
            <Tab eventKey={ProjectToolActions.ADD_DATA} title={ProjectToolActions.ADD_DATA}>
                <ProjectDataManagementView/>
            </Tab>
            <Tab eventKey={ProjectToolActions.TRAIN} title={ProjectToolActions.TRAIN}>
                <ProjectTrainingView dataItems={this.getDataItems()}/>
            </Tab>
        </Tabs>
    );
  }

  getVisualizations() {
      return [
          new ProjectVisualizationModel(
          "~/assets/graph.svg",
          "Distribution of Data", 
          "This is where the description of the data visualization would go! I don't have anything for it yet.")
        ];
  }

  getDataItems() {
      return [
        new DataItemModel(
            'Tweet',
            new Date(),
            'This would be the body of the example Tweet. Additionally, people could expand this box to see more information about it. Finally, people could add or remove tags by interacting with them.',
            ['healthcare', 'economics']
        )
      ]
  }
}
