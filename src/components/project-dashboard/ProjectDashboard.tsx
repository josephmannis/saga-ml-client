import * as React from 'react';
import ProjectInformation from './project-information/ProjectInformation';
import ProjectToolsTabView from './project-tools/ProjectToolsTabView';
import { IProjectDashboard } from '../clientTypes';
import { AppState } from '../../state/store';
import { useSelector } from 'react-redux';


export interface IProjectDashboardProps {
    project: IProjectDashboard;
}

export const ConnectedProjectDashboard: React.FC = () => {
  const { project } = useSelector((state: AppState) => state.dashboardReducer)

  return ( 
    <ProjectDashboard project={project}/>
  )
}

const ProjectDashboard: React.FC<IProjectDashboardProps> = props => {
  return (
    <div>
      <ProjectInformation projectTitle={props.project.title} projectDescription={props.project.description}/>
      <ProjectToolsTabView project={props.project}/>
    </div>
  );
}

export default ProjectDashboard;