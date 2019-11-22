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
            dataRows: [
                ['Governor @MattBevin has done a wonderful job for the people of Kentucky! He continues to protect your very important Second Amendment. Matt is Strong on Crime and the Border, he Loves our Great Vets and Military', '09/31/19', 'education'],
                ['MISSISSIPPI! There is a VERY important election for Governor on November 5th. I need you to get out and VOTE for our Great Republican nominee, @TateReeves. Tate is Strong on Crime, tough on Illegal Immigration, and will protect your Second Amendment', '09/31/19', 'education']
            ]
        },
        comments: [
            {
                id: 'projectcomment+1',
                authorId: 'Jules',
                body: 'Using the republican tag as a baseline for fragments of text about healthcare is probably pretty inaccurate. The model is likely to tag nearly everything which heavily affects visualizations.',
                votes: 3,
                replies: []
            },
            {
                id: 'projectcomment+2',
                authorId: 'Bob',
                body: 'This is very interesting!',
                votes: 1,
                replies: []
            },
            {
                id: 'projectcomment+3',
                authorId: 'Bob',
                body: 'I would be careful with what you’re using for data as well. ',
                votes: -1,
                replies: []
            }
        ]
    }
};

export function dashboardReducer(state = initialState, action: DashBoardActionType): DashboardState {
    switch(action.type) {
        case DashboardActions.FETCH_PROJECT:
            return { ...state, project: action.project };
        case DashboardActions.ADD_PROJECT_DATA:
            return { ...state, project: {...state.project, data: {...state.project.data, dataRows: state.project.data.dataRows.concat(action.newData)}}}
        case DashboardActions.ADD_PROJECT_COMMENT: 
            return addProjectComment(state, action.authorId, action.comment);
        case DashboardActions.UPVOTE_PROJECT_COMMENT:
            return updateProjectComment(state, action.commentId, 1);
        case DashboardActions.DOWNVOTE_PROJECT_COMMENT: 
            return updateProjectComment(state, action.commentId, -1);
        default: 
            return state;
    };
}


function updateProjectComment(state: DashboardState, commentId: string, voteChange: number): DashboardState {
    return(
        {
        ...state,
        project: {...state.project, comments: state.project.comments.map(comment => comment.id === commentId ? {...comment, votes: comment.votes + voteChange} : comment) }
        }
    )
}

function addProjectComment(state: DashboardState, authorId: string, commentBody: string): DashboardState {
    return {...state, project: {...state.project, comments: [...state.project.comments, {id: 'newcomment+' + state.project.comments.length, votes: 0, authorId: authorId, body: commentBody, replies: [] }]}}
}