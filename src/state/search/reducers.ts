import { IProjectListing } from "../../components/clientTypes";
import { SearchActionType, SearchActions } from "./actions";
import { search } from "../backend";

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
            return { searchResults: search() };
        default: 
            return state;
    };
}