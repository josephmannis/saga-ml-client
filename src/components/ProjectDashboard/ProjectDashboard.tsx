import * as React from 'react';
import ProjectInformation from '../ProjectInformation/ProjectInformation';
import ProjectToolsTabView from '../ProjectTools/ProjectToolsTabView'


export interface IProjectDashboardProps {
    projectTitle: string;
    projectDescription: string;
}

export default class ProjectDashboard extends React.Component<IProjectDashboardProps> {
  public render() {
    return (
      <div>
        <ProjectInformation projectTitle={this.props.projectTitle} projectDescription={this.props.projectDescription}/>
        <ProjectToolsTabView/>
      </div>
    );
  }
}
