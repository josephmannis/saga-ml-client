import { DashboardActions, DashBoardActionType } from './actions';
import { IProjectDashboard, IVisualizationDataPoint, IProjectVisualization, IProjectVisualizationType } from '../../components/clientTypes';

// State types
export interface DashboardState {
    project: IProjectDashboard;
}
const ex: IVisualizationDataPoint = {
    timeStamp: new Date(2018, 0, 1),
    type: 'tweet',
    text: "trump tweeted about education",
    tags: ['trump', 'education']
};

/*https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates*/
function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function randomDataPoint(): IVisualizationDataPoint {
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

function randomDataPointList(length: number): IVisualizationDataPoint[] {
    return Array(length).fill(0).map(randomDataPoint);
}

function sampleVis(): IProjectVisualization[] {
    return [
        {
            id: 'fake',
            title: "Line sample",
            description: "line sample grpah description",
            startTime: new Date(2015, 0),
            endTime: new Date(2019, 0),
            labels: ['education', 'immigration', 'healthcare'],
            type: IProjectVisualizationType.LINE,
            dataPoints: []
        },
        {
            id: 'fake',
            title: "Pie sample",
            description: "pie sample grpah description",
            startTime: new Date(2015, 0),
            endTime: new Date(2019, 0),
            labels: ['education', 'immigration', 'healthcare'],
            type: IProjectVisualizationType.PIE,
            dataPoints: []
        }
    ]
}

// Reducer functions
const initialState: DashboardState = {
    project: {
        id: 'fake',
        title: 'Title',
        description: 'Fake Title',
        topics: ['Topic 1', 'Topic 2'],
        ownerId: 'fake',
        visualizations: sampleVis(),
        data: {
            columnTitles: ['content', 'date', 'tags'],
            dataRows: []
        },
        comments: []
    }
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return { ...state, project: action.project };
        default: 
            return state;
    };
}