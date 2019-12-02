import { HomeActions, HomeActionType, fetchPublishedProjects } from './actions';
import { IProjectListing, IProjectDashboard } from '../../components/clientTypes';
import {v1 } from 'uuid';
import { fetchFeaturedProjects, fetchUserProjects, createProject} from '../backend';

// State types
export interface HomeState {
    featuredProjects: IProjectListing[];
    userProjects: IProjectListing[];
 }
 
 // Reducer functions
const initialState: HomeState = {
    featuredProjects: [],
    userProjects: [],
}

export function homeReducer(state = initialState, action: HomeActionType): HomeState {
    switch(action.type) {
        case HomeActions.FETCH_FEATURED_PROJECTS:
            return { ...state, featuredProjects: fetchFeaturedProjects() };
        case HomeActions.FETCH_USER_PROJECTS:
            return { ...state, userProjects: fetchUserProjects() };
        case HomeActions.CREATE_USER_PROJECT:
            return createUserProject(state, action);
        default: 
            return state;
    };
}

// Bad, should be async
function createUserProject(state: HomeState, action: HomeActionType): HomeState {
    if (action.type === HomeActions.CREATE_USER_PROJECT) {
        let project = createProject(action.projectTitle, action.projectDescription, action.projectTopics, action.projectOwnerId)
        return { ...state, userProjects: [...state.userProjects, project] };
    }

    throw Error('Invalid action type.');
}