import { IProjectListing } from "../../components/clientTypes";
import { SearchActionType, SearchActions } from "./actions";

// State types
export interface SearchState {
    searchResults: IProjectListing[];
}
 
 // Reducer functions
const initialState: SearchState = {
    searchResults: []
}

export function searchReducer(state = initialState, action: SearchActionType): SearchState {
    switch(action.type) {
        case SearchActions.SEARCH_BY_QUERY:
            return { searchResults: getSearchResults() };
        default: 
            return state;
    };
}

const getSearchResults = () => {
    return [
        {
            id: 'not real',
            title: 'Healthcare and the Debates of Donald Trump',
            coverImageUrl: 'www.fake.com',
            description: 'Presidential Debates of Donald Trump',
            topics: ['trump', 'healthcare'],
            ownerId: '3'
        },
        {
            id: 'not real',
            title: 'Hillary Clinton vs Donald Trump',
            coverImageUrl: 'www.fake.com',
            description: 'Studies between topics discussed by Hillary and Donald Trump.',
            topics: ['democrat', 'republican', 'healthcare'],
            ownerId: '3'
        },
        {
            id: 'not real',
            title: 'Donald Trump and Twitter',
            coverImageUrl: 'www.fake.com',
            description: 'Presidential Debates of Donald Trump',
            topics: ['crime', 'healthcare', 'justice', 'world issues'],
            ownerId: '3'
        },
        {
            id: 'not real',
            title: 'Clashes between republican candidates',
            coverImageUrl: 'www.fake.com',
            description: 'Understanding in-house debates between candiates for the elections.',
            topics: ['debates', 'presidents'],
            ownerId: '3'
        },
    ]
}