import { IProjectListing } from '../../components/clientTypes';

// Types
export enum HomeActions {
    FETCH_FEATURED_PROJECTS = 'FETCH_FEATURED_PROJECTS',
    FETCH_USER_PROJECTS = 'FETCH_USER_PROJECTS',
    CREATE_USER_PROJECT = 'CREATE_USER_PROJECT'
}

interface FetchFeaturedProjectsAction {
    type: typeof HomeActions.FETCH_FEATURED_PROJECTS;
    publishedProjects: IProjectListing[];
} 

interface FetchUserProjectsAction {
    type: typeof HomeActions.FETCH_USER_PROJECTS;
    userProjects: IProjectListing[];
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
export function fetchPublishedProjects(projects: IProjectListing[]): HomeActionType {
    return {
        type: HomeActions.FETCH_FEATURED_PROJECTS,
        publishedProjects: projects
    }
}

export function fetchUserProjects(projects: IProjectListing[]): HomeActionType {
    return {
        type: HomeActions.FETCH_USER_PROJECTS,
        userProjects: projects
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