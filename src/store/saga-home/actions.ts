import { UserProject, PublishedProject } from './StateTypes';
import { UserProject } from './reducers';

// Types
export enum HomeActions {
    FETCH_FEATURED_PROJECTS = 'FETCH_FEATURED_PROJECTS',
    FETCH_USER_PROJECTS = 'FETCH_USER_PROJECTS',
    CREATE_USER_PROJECT = 'CREATE_USER_PROJECT'
}

interface FetchFeaturedProjectsAction {
    type: typeof HomeActions.FETCH_FEATURED_PROJECTS;
    publishedProjects: PublishedProject[];
} 

interface FetchUserProjectsAction {
    type: typeof HomeActions.FETCH_USER_PROJECTS;
    userProjects: UserProject[];
}

interface CreateUserProjectAction {
    type: typeof HomeActions.CREATE_USER_PROJECT;
    project: UserProject;
}

export type HomeAction =
| FetchFeaturedProjectsAction
| FetchUserProjectsAction
| CreateUserProjectAction

// Creators
export function fetchPublishedProjects(projects: PublishedProject[]): HomeAction {
    return {
        type: HomeActions.FETCH_FEATURED_PROJECTS,
        publishedProjects: projects
    }
}

export function fetchUserProjects(projects: UserProject[]): HomeAction {
    return {
        type: HomeActions.FETCH_USER_PROJECTS,
        userProjects: projects
    }
}

export function createUserProject(project: UserProject): HomeAction {
    return {
        type: HomeActions.CREATE_USER_PROJECT,
        project: project
    }
}