
// Types
export enum HomeActions {
    FETCH_FEATURED_PROJECTS = 'FETCH_FEATURED_PROJECTS',
    FETCH_USER_PROJECTS = 'FETCH_USER_PROJECTS',
    CREATE_USER_PROJECT = 'CREATE_USER_PROJECT'
}

interface FetchFeaturedProjectsAction {
    type: typeof HomeActions.FETCH_FEATURED_PROJECTS;
} 

interface FetchUserProjectsAction {
    type: typeof HomeActions.FETCH_USER_PROJECTS;
}

interface CreateUserProjectAction {
    type: typeof HomeActions.CREATE_USER_PROJECT;
    projectTitle: string;
    projectDescription: string;
    projectTopics: string[];
    projectOwnerId: string;
}

export type HomeActionType =
| FetchFeaturedProjectsAction
| FetchUserProjectsAction
| CreateUserProjectAction

// Creators
export function fetchPublishedProjects(): HomeActionType {
    return {
        type: HomeActions.FETCH_FEATURED_PROJECTS
    }
}

export function fetchUserProjects(): HomeActionType {
    return {
        type: HomeActions.FETCH_USER_PROJECTS
    }
}

export function createUserProject(title: string, description: string, topics: string[], ownerId: string): HomeActionType {        
    return {
        type: HomeActions.CREATE_USER_PROJECT,
        projectTitle: title,
        projectDescription: description,
        projectTopics: topics,
        projectOwnerId: ownerId
    }
}