import * as React from 'react';
import ProjectInformation from './project-information/ProjectInformation';
import ProjectToolsTabView from './project-tools/ProjectToolsTabView';
import { DashboardState } from "../../state/dashboard/reducers";


export interface IProjectDashboardProps {
    dashBoard: DashboardState
}

export default class ProjectDashboard extends React.Component<IProjectDashboardProps> {
  public render() {
    return (
      <div>
        <ProjectInformation projectTitle={this.props.dashBoard.project.title} projectDescription={this.props.dashBoard.project.description}/>
        <ProjectToolsTabView dashBoard={this.props.dashBoard}/>
      </div>
    );
  }
}
