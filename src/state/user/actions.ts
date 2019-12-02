import { v1 } from 'uuid';
import { store } from '../store';

export enum UserActions {
    LOGIN_USER = 'LOGIN_USER',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT_USER = 'LOGOUT_USER',
}

interface LoginUserAction {
    type: typeof UserActions.LOGIN_USER;
    username: string;
    password: string;
}

interface LoginUserSuccessAction {
    type: typeof UserActions.LOGIN_SUCCESS;
    username: string;
    id: string;
}

interface LoginUserFailureAction {
    type: typeof UserActions.LOGIN_FAILURE;
    error: Error;
}

interface LogoutUserAction {
    type: typeof UserActions.LOGOUT_USER;
}

export const signup = (username: string, password: string) => {
    login(username, password);
}

export const login = (username: string, password: string) => { 
    // Normally would do some kind of auth call/user validation here...
    let rawUser = window.localStorage.getItem(username);

    if (rawUser) {
        let parsedUser = JSON.parse(rawUser);

        store.dispatch({
            type: UserActions.LOGIN_SUCCESS,
            username: parsedUser.username,
            id: parsedUser.id
        })
    } else {
        let newUser = { username: username, id: v1() };
        
        window.localStorage.setItem(username, JSON.stringify(newUser));

        store.dispatch({
            type: UserActions.LOGIN_SUCCESS,
            username: username,
            id: newUser.id
        })
    }
}

export const logout = () => {
    store.dispatch({
        type: UserActions.LOGOUT_USER
    })
}

export type UserActionType = 
| LoginUserAction
| LogoutUserAction 
| LoginUserSuccessAction
| LoginUserFailureAction
