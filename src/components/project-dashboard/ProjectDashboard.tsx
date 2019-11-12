import * as React from 'react';
import ProjectInformation from './project-information/ProjectInformation';
import ProjectToolsTabView from './project-tools/ProjectToolsTabView';
import { IProjectDashboard } from '../clientTypes';
import { AppState } from '../../state/store';
import { useSelector } from 'react-redux';


export interface IProjectDashboardProps {
    project: IProjectDashboard;
    onVisualizationCreated: () => void;
    onDataAdded: () => void;
}

export const ConnectedProjectDashboard: React.FC = () => {
  const { project } = useSelector((state: AppState) => state.dashboardReducer)

  const onVisualizationCreated = () => {
    console.log('creating visualization');
  }

  const onDataAdded = () => {
    console.log('adding data');
  }

  return ( 
    <ProjectDashboard onVisualizationCreated={() => onVisualizationCreated()} onDataAdded={ () => onDataAdded() } project={project}/>
  )
}

const ProjectDashboard: React.FC<IProjectDashboardProps> = props => {
  return (
    <div>
      <ProjectInformation projectTitle={props.project.title} projectDescription={props.project.description}/>
      <ProjectToolsTabView onDataAdded={() => props.onDataAdded()} onVisualizationCreated={() => props.onVisualizationCreated()} project={props.project}/>
    </div>
  );
}

export default ConnectedProjectDashboard;