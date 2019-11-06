import * as React from 'react';
import ProjectInformation from './project-information/ProjectInformation';
import ProjectToolsTabView from './project-tools/ProjectToolsTabView';
import { IProject } from '../model';


export interface IProjectDashboardProps {
    project: IProject
}

export default class ProjectDashboard extends React.Component<IProjectDashboardProps> {
  public render() {
    return (
      <div>
        <ProjectInformation projectTitle={this.props.project.title} projectDescription={this.props.project.description}/>
        <ProjectToolsTabView project={this.props.project}/>
      </div>
    );
  }
}
