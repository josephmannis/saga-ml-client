import * as React from 'react';
import ProjectInformation from './project-information/ProjectInformation';
import ProjectToolsTabView from './project-tools/ProjectToolsTabView';
import { IProjectDashboard } from '../clientTypes';
import { AppState } from '../../state/store';
import { useSelector } from 'react-redux';


interface IConnectedProjectDashboardProps {
    project: IProjectDashboard;
}

const ConnectedProjectDashboard: React.FC = () => {
  const { project } = useSelector((state: AppState) => state.dashboardReducer)

  return ( 
    <ProjectDashboard project={project}/>
  )
}

interface IProjectDashboardProps extends IConnectedProjectDashboardProps {}

const ProjectDashboard: React.FC<IProjectDashboardProps> = props => {
  return (
    <div>
      <ProjectInformation projectTitle={props.project.title} projectDescription={props.project.description}/>
      <ProjectToolsTabView project={props.project}/>
    </div>
  );
}

export default ConnectedProjectDashboard;