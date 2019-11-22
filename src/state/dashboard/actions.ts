import {IProjectDashboard, IProjectVisualization} from "../../components/clientTypes"

// Types
export enum DashboardActions {
    FETCH_PROJECT = 'FETCH_PROJECTS',
    ADD_PROJECT_DATA = 'ADD_PROJECT_DATA',
    ADD_VISUALIZATION = 'ADD_VISUALIZATION',
    ADD_PROJECT_COMMENT = 'ADD_PROJECT_COMMENT',
    UPVOTE_PROJECT_COMMENT = 'UPVOTE_PROJECT_COMMENT',
    DOWNVOTE_PROJECT_COMMENT = 'DOWNVOTE_PROJECT_COMMENT'
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

interface AddProjectCommentAction {
    type: typeof DashboardActions.ADD_PROJECT_COMMENT;
    authorId: string;
    comment: string;
}

interface UpvoteProjectCommentAction {
    type: typeof DashboardActions.UPVOTE_PROJECT_COMMENT;
    commentId: string;
}

interface DownvoteProjectCommentAction {
    type: typeof DashboardActions.DOWNVOTE_PROJECT_COMMENT;
    commentId: string;
}

export type DashBoardActionType =
| FetchProjectAction
| AddProjectDataAction
| AddVisualizationAction
| AddProjectCommentAction
| UpvoteProjectCommentAction
| DownvoteProjectCommentAction

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

export function addProjectComment(authorId: string, comment: string): DashBoardActionType {
    return {
        type: DashboardActions.ADD_PROJECT_COMMENT,
        authorId: authorId,
        comment: comment
    }
}

