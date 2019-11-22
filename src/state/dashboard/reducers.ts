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
            description: "line sample graph description",
            startTime: new Date(2018, 0),
            endTime: new Date(2019, 11),
            labels: {'education': '#6c0f18', 'immigration': '#27944f', 'trump': '#0b1cf0'},
            type: IProjectVisualizationType.LINE,
        },
        {
            id: 'fake',
            title: "Pie sample",
            description: "pie sample graph description",
            startTime: new Date(2015, 0),
            endTime: new Date(2019, 11),
            labels: {'education': '#6c0f18', 'immigration': '#27944f',  'trump': '#0b1cf0'},
            type: IProjectVisualizationType.PIE,
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
            dataRows: [
                ['Governor @MattBevin has done a wonderful job for the people of Kentucky! He continues to protect your very important Second Amendment. Matt is Strong on Crime and the Border, he Loves our Great Vets and Military', '09/31/19', 'education'],
                ['MISSISSIPPI! There is a VERY important election for Governor on November 5th. I need you to get out and VOTE for our Great Republican nominee, @TateReeves. Tate is Strong on Crime, tough on Illegal Immigration, and will protect your Second Amendment', '09/31/19', 'immigration, trump']
            ]
        },
        comments: []
    }
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return { ...state, project: action.project };
        case DashboardActions.ADD_PROJECT_DATA:
            return { ...state, project: {...state.project, data: {...state.project.data, dataRows: state.project.data.dataRows.concat(action.newData)}}}
        default:
            return state;
    };
}