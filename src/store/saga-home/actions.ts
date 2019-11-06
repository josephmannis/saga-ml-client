import { UserProject, PublishedProject } from './StateTypes';

// Types
export enum HomeActions {
    FETCH_FEATURED_PROJECTS = 'FETCH_FEATURED_PROJECTS',
    FETCH_USER_PROJECTS = 'FETCH_USER_PROJECTS',
    CREATE_USER_PROJECT = 'CREATE_USER_PROJECT'
}

interface FetchFeaturedProjectsAction {
    type: typeof SagaHomeActions.FETCH_FEATURED_PROJECTS;
    publishedProjects: PublishedProject[];
} 

interface FetchUserProjectsAction {
    type: typeof SagaHomeActions.FETCH_USER_PROJECTS;
    userProjects: UserProject[];
}

interface CreateUserProjectAction {
    type: typeof SagaHomeActions.CREATE_USER_PROJECT;
    creatingProject: boolean;
}


// Creators
export function fetchPublishedProjects(projects: PublishedProject[]): SagaHomeActionTypes {
    return {
        type: SagaHomeActions.FETCH_FEATURED_PROJECTS,
        payload: projects
    }
}

export function fetchUserProjects(projects: UserProject[]): SagaHomeActionTypes {
    return {
        type: SagaHomeActions.FETCH_USER_PROJECTS,
        payload: projects
    }
}

export function createUserProject(project: UserProject): SagaHomeActionTypes {
    return {
        type: SagaHomeActions.CREATE_USER_PROJECT,
        payload: project
    }
}