import { IProjectDashboard } from "../../components/clientTypes"

// Types
export enum DashboardActions {
    FETCH_PROJECT = 'FETCH_PROJECTS',
}

interface FetchProjectAction {
    type: typeof DashboardActions.FETCH_PROJECT;
    project: IProjectDashboard;
}

export type DashBoardActionType =
| FetchProjectAction

// Creators
export function fetchProject(project: IProjectDashboard): DashBoardActionType {
    return {
        type: DashboardActions.FETCH_PROJECT,
        project: project
    }
}