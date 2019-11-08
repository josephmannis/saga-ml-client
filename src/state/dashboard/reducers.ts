import { DashboardActions, DashBoardActionType } from './actions';
import {DataPoint, ProjectDashboard} from './datatypes';

// State types
export interface DashboardState {
    project: ProjectDashboard;
    tab: string; // this is unused and ignored probably should be removed
}
const ex: DataPoint = {
    timeStamp: new Date(2018, 0, 1),
    type: 'tweet',
    text: "trump tweeted about education",
    tags: ['trump', 'education']
};

/*https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates*/
function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function randomDataPoint(): DataPoint {
    const startDate = new Date(2015, 0);
    const endDate = new Date(2019, 0);
    const possibleTags = ['education', 'immigration', 'healthcare', 'republican', 'democrat', 'trump'];
    const tags = [possibleTags[Math.floor(Math.random()*possibleTags.length)]];
    return {
        timeStamp: randomDate(startDate, endDate),
        type: 'tweet',
        text: 'some tweet',
        tags
    };
}

function randomDataPointList(length: number): DataPoint[] {
    return Array(length).fill(0).map(randomDataPoint);
}

// Reducer functions
const initialState: DashboardState = {
    project: {
        projectId: 'fake',
        title: 'Title',
        description: 'Fake Title',
        topics: ['Topic 1', 'Topic 2'],
        dataPoints: randomDataPointList(1000),
        visualizations: [],
},
    tab: "visualizations" // probably shouldn't be here its never used, keeping as placeholder
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    console.log(initialState);
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return { ...state, project: action.project };
        default: 
            return state;
    };
}