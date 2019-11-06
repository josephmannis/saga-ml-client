import { HomeState, UserProject, PublishedProject } from './StateTypes';
import { HomeActionTypes, HomeActions } from './ActionTypes';


// State types
export interface HomeState {
    featuredProjects: PublishedProject[];
    userProjects: UserProject[];
    creatingProject: boolean;
 }
 
 // Reducer functions
const initialState: HomeState = {
    featuredProjects: [],
    userProjects: [],
    creatingProject: false
}

export function homeReducer(
    state = initialState,
    action: HomeActionTypes
): HomeState {
    switch(action.type) {
        case HomeActions.FETCH_FEATURED_PROJECTS:
            return {
                ...state,
                featuredProjects: [...state.featuredProjects, action. as PublishedProject[]],
            };
        case HomeActions.FETCH_USER_PROJECTS:
            return {
                ...state,
                userProjects: action.payload,
            };
        case HomeActions.CREATE_USER_PROJECT:
            return {
                ...state,
                creatingProject: action.payload
            };
        default: 
            return state;

    };
}


function getFeaturedProjects(): PublishedProject[] {
    let state: PublishedProject[] = [];

    state.push({
        projectId: 'fakeid',
        projectTitle: 'title',
        coverImageUrl: 'img',
        topics: ['example', 'example']
    });

    return state;
}

function getUserProjects(): UserProject[] {
    let state: UserProject[] = [];

    state.push({
        projectId: 'fakeid',
        projectTitle: 'title',
    });

    return state;
}