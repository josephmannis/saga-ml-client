import { HomeActions, HomeActionType } from './actions';
import { UserProject, PublishedProject } from './datatypes';

// State types
export interface HomeState {
    featuredProjects: PublishedProject[];
    userProjects: UserProject[];
    displayedProject: UserProject | null;
 }
 
 // Reducer functions
const initialState: HomeState = {
    featuredProjects: [],
    userProjects: [],
    displayedProject: null,
}

export function homeReducer(state = initialState, action: HomeActionType): HomeState {
    switch(action.type) {
        case HomeActions.FETCH_FEATURED_PROJECTS:
            return { ...state, featuredProjects: action.publishedProjects };
        case HomeActions.FETCH_USER_PROJECTS:
            return { ...state, userProjects: action.userProjects };
        case HomeActions.CREATE_USER_PROJECT:
            return { ...state, displayedProject: action.project };
        default: 
            return state;
    };
}