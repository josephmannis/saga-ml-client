import { HomeActions, HomeActionType } from './actions';
import { UserProject, PublishedProject } from './datatypes';

// State types
export interface HomeState {
    featuredProjects: PublishedProject[];
    userProjects: UserProject[];
 }
 
 // Reducer functions
const initialState: HomeState = {
    featuredProjects: [],
    userProjects: [{projectId: 'fake', projectTitle: 'Healthcare', topics: [], owner: {id: 'fake', username: 'me'}}, {projectId: 'fake', projectTitle: 'Healthcare', topics: [], owner: {id: 'fake', username: 'me'}}, ],
}

export function homeReducer(state = initialState, action: HomeActionType): HomeState {
    switch(action.type) {
        case HomeActions.FETCH_FEATURED_PROJECTS:
            return { ...state, featuredProjects: action.publishedProjects };
        case HomeActions.FETCH_USER_PROJECTS:
            return { ...state, userProjects: action.userProjects };
        case HomeActions.CREATE_USER_PROJECT:
            return { ...state, userProjects: [...state.userProjects, action.project] };
        default: 
            return state;
    };
}