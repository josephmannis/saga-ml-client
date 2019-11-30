
// Types
export enum SearchActions {
    SEARCH_BY_QUERY = 'SEARCH_BY_QUERY',
}

interface SearchProjectsAction {
    type: typeof SearchActions.SEARCH_BY_QUERY;
    query: string;
} 

export type SearchActionType =
| SearchProjectsAction

// Creators
export function searchPublishedProjects(query: string): SearchActionType {
    return {
        type: SearchActions.SEARCH_BY_QUERY,
        query: query
    }
}