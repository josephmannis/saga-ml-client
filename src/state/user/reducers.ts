import { UserActions, UserActionType } from './actions';
import { IUser } from '../../components/clientTypes';

// State types
export interface UserState {
    currentUser: IUser | null;
}
 
 // Reducer functions
const initialState: UserState = {
    currentUser: null,
}

export function userReducer(state = initialState, action: UserActionType): UserState {
    switch(action.type) {
        case UserActions.LOGIN_SUCCESS:
            return { ...state, currentUser: { username: action.username, id: action.id } };
        case UserActions.LOGOUT_USER:
            return { ...state, currentUser: null };
        default: 
            return state;
    };
}