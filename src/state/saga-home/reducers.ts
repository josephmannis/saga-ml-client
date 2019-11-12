import { HomeActions, HomeActionType } from './actions';
import { PublishedProject } from './datatypes';
import { IProjectListing } from '../../components/clientTypes';

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
            return { ...state, featuredProjects: action.publishedProjects };
        case HomeActions.FETCH_USER_PROJECTS:
            return { ...state, userProjects: action.userProjects };
        case HomeActions.CREATE_USER_PROJECT:
            return { ...state, userProjects: [...state.userProjects, { id: 'new', title: action.projectTitle, coverImageUrl: 'no', description: action.projectDescription, topics: action.projectTopics, ownerId: action.projectOwnerId }] };
        default: 
            return state;
    };
}