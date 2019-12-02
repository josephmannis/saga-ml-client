import {DashboardActions, DashBoardActionType} from './actions';
import { IProjectDashboard } from '../../components/clientTypes';
import { fetchProjectById } from '../backend';

// State types
export interface DashboardState {
    project: IProjectDashboard;
}

// Reducer functions
const initialState: DashboardState = {
    project: {id: 'fake', title: 'fake', data: {columnTitles: [], dataRows: []}, description: '', topics: [], ownerId: '', visualizations: [], comments: []}
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return fetchProject(action.projectId);
        case DashboardActions.ADD_PROJECT_DATA:
            return { project: {...state.project, data: {...state.project.data, dataRows: state.project.data.dataRows.concat(action.newData)}}};
        case DashboardActions.ADD_VISUALIZATION:
            return { project: {...state.project, visualizations: [...state.project.visualizations, action.newVisualization]}};
        case DashboardActions.ADD_PROJECT_COMMENT:
            return addProjectComment(state, action.authorId, action.comment);
        case DashboardActions.UPVOTE_PROJECT_COMMENT:
            return updateProjectComment(state, action.commentId, 1);
        case DashboardActions.DOWNVOTE_PROJECT_COMMENT:
            return updateProjectComment(state, action.commentId, -1);
        default:
            return state;
    };
}

function fetchProject(id: string): DashboardState {
    return { project: fetchProjectById(id) };
}


function updateProjectComment(state: DashboardState, commentId: string, voteChange: number): DashboardState {
    return(
        {
        ...state,
        project: {...state.project, comments: state.project.comments.map(comment => comment.id === commentId ? {...comment, votes: comment.votes + voteChange} : comment) }
        }
    )
}

function addProjectComment(state: DashboardState, authorId: string, commentBody: string): DashboardState {
    return {...state, project: {...state.project, comments: [...state.project.comments, {id: 'newcomment+' + state.project.comments.length, votes: 0, authorId: authorId, body: commentBody, replies: [] }]}}
}