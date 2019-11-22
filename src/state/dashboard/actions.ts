import {IProjectDashboard, IProjectVisualization} from "../../components/clientTypes"

// Types
export enum DashboardActions {
    FETCH_PROJECT = 'FETCH_PROJECTS',
    ADD_PROJECT_DATA = 'ADD_PROJECT_DATA',
    ADD_VISUALIZATION = 'ADD_VISUALIZATION'
}

interface FetchProjectAction {
    type: typeof DashboardActions.FETCH_PROJECT;
    project: IProjectDashboard;
}

interface AddProjectDataAction {
    type: typeof DashboardActions.ADD_PROJECT_DATA;
    projectId: string;
    newData: string[][];
}

interface AddVisualizationAction {
    type: typeof DashboardActions.ADD_VISUALIZATION;
    projectId: string;
    newVisualization: IProjectVisualization;
}

export type DashBoardActionType =
| FetchProjectAction
| AddProjectDataAction
| AddVisualizationAction

// Creators
export function fetchProject(project: IProjectDashboard): DashBoardActionType {
    return {
        type: DashboardActions.FETCH_PROJECT,
        project: project
    }
}

export function addDataToProject(projectId: string, newData: string[][]): DashBoardActionType {
    return { 
        type: DashboardActions.ADD_PROJECT_DATA,
        projectId: projectId,
        newData: newData
    }
}

export function addVisualizationToProject(projectId: string, newVisualization: IProjectVisualization): DashBoardActionType {
    return {
        type: DashboardActions.ADD_VISUALIZATION,
        projectId: projectId,
        newVisualization
    }
}