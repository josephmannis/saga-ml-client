import { ProjectDashboard } from './datatypes';

// Types
export enum DashboardActions {
    FETCH_PROJECT = 'FETCH_PROJECTS',
}

interface FetchProjectAction {
    type: typeof DashboardActions.FETCH_PROJECT;
    project: ProjectDashboard;
}

export type DashBoardActionType =
| FetchProjectAction

// Creators
export function fetchProject(project: ProjectDashboard): DashBoardActionType {
    return {
        type: DashboardActions.FETCH_PROJECT,
        project: project
    }
}