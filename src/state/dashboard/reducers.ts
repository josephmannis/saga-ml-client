import { DashboardActions, DashBoardActionType } from './actions';
import {ProjectDashboard} from './datatypes';

// State types
export interface DashboardState {
    project: ProjectDashboard;
    tab: string;
}



// Reducer functions
const initialState: DashboardState = {
    project: {
        projectId: 'fake',
        title: 'Title',
        description: 'Fake Title',
        topics: ['Topic 1', 'Topic 2'],
        dataPoints: [],
        visualizations: [],
},
    tab: "visualizations"
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return { ...state, project: action.project };
        default: 
            return state;
    };
}