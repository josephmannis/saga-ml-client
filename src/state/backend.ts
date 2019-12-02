import { IProjectDashboard, IProjectVisualization, IProjectVisualizationType, IProjectListing, } from "../components/clientTypes";
import { v1 } from 'uuid';

const USER_PROJECTS_KEY = 'USER_PROJECTS';
const PUBLISHED_PROJECTS_KEY = 'PUBLISHED_PROJECTS';
const BACKEND_INITIALIZED = 'BACKEND_INITIALIZED';

export function initialize() {
    let initialized = localStorage.getItem(BACKEND_INITIALIZED);

    if (!initialized) {
        console.log('initializing')
        initializeUserProjects();
        initializePublishedProjects();
        localStorage.setItem(BACKEND_INITIALIZED, BACKEND_INITIALIZED);
    }
}

function initializePublishedProjects() {
    let publishedProjects = getFeaturedProjects().concat(getSearchResults());

    localStorage.setItem(PUBLISHED_PROJECTS_KEY, JSON.stringify(publishedProjects));
}

function initializeUserProjects() {
    localStorage.setItem(USER_PROJECTS_KEY, JSON.stringify([]));
}

export function fetchUserProjects(): IProjectDashboard[] {
    let userProjects = localStorage.getItem(USER_PROJECTS_KEY);
    
    if (userProjects) {
        return JSON.parse(userProjects) as IProjectDashboard[];
    }

    throw Error('User projects not initialized correctly.');
}

export function fetchFeaturedProjects(): IProjectDashboard[] {
    let publishedProjects = localStorage.getItem(PUBLISHED_PROJECTS_KEY);
    
    if (publishedProjects) {
        return JSON.parse(publishedProjects) as IProjectDashboard[];
    }

    throw Error('Published projects not initialized correctly.');
}

export function search(): IProjectListing[] {
    return fetchFeaturedProjects();
}

export function createProject(title: string, description: string, topics: string[], ownerId: string): IProjectDashboard {
    let userProjects: IProjectDashboard[] = JSON.parse(localStorage.getItem(USER_PROJECTS_KEY)!);
    let project: IProjectDashboard =  { id: v1(), title, description, topics, ownerId, visualizations: [], data: {columnTitles: [], dataRows: []}, comments: [] }
    
    updateUserProjects(userProjects.concat(project));
    return project;
}

export function fetchProjectById(projectId: string): IProjectDashboard {
    let projects: IProjectDashboard[] = fetchFeaturedProjects().concat(fetchUserProjects());
    let project = projects.find(project => project.id === projectId);

    if (!project) {
        throw Error('Failed to find project, bug in backend.');
    }

    return project;
}

function updateUserProjects(projects: IProjectDashboard[]) {
    localStorage.setItem(USER_PROJECTS_KEY, JSON.stringify(projects));
}

/*https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates*/
function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function randomDataRow(): string[] {
    const startDate = new Date(2015, 0);
    const endDate = new Date(2019, 0);
    const randomTime = randomDate(startDate, endDate);
    const dateString = (randomTime.getMonth() + 1) + "/" + (randomTime.getDate()) + "/" + (randomTime.getFullYear() - 2000);
    const possibleTags = ['education', 'immigration', 'healthcare', 'republican', 'democrat', 'trump'];
    const tagsString = possibleTags[Math.floor(Math.random()*possibleTags.length)];

    return ["some text", dateString, tagsString];
}
//
function randomIProjectDataRows(length: number): string[][] {
 return Array(length).fill(0).map(randomDataRow);
 }

export default function makePublicProject(id: string, title: string, description: string, topics: string[], ownerId: string) {
    let project: IProjectDashboard = 
        {
            id, title, description, topics, ownerId,
            visualizations: [],
            data: {
                columnTitles: ['content', 'date', 'tags'],
                dataRows:  randomIProjectDataRows(1000)
                //   [
                //     ['Governor @MattBevin has done a wonderful job for the people of Kentucky! He continues to protect your very important Second Amendment. Matt is Strong on Crime and the Border, he Loves our Great Vets and Military', '09/31/19', 'education'],
                //     ['MISSISSIPPI! There is a VERY important election for Governor on November 5th. I need you to get out and VOTE for our Great Republican nominee, @TateReeves. Tate is Strong on Crime, tough on Illegal Immigration, and will protect your Second Amendment', '09/31/19', 'immigration, trump']
                // ]
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


    localStorage.setItem(project.id, JSON.stringify(project as IProjectDashboard));

    return project;
}

const getSearchResults = () => {
    let projects = [
        makePublicProject(v1(), 'Healthcare and the Debates of Donald Trump', 'Presidential Debates of Donald Trump', ['trump', 'healthcare'], '3'),
        makePublicProject(v1(), 'Hillary Clinton vs Donald Trump','Studies between topics discussed by Hillary and Donald Trump.',['democrat', 'republican', 'healthcare'],'3'),
        makePublicProject(v1(), 'Donald Trump and Twitter','Presidential Debates of Donald Trump',['crime', 'healthcare', 'justice', 'world issues'],'3'),
        makePublicProject(v1(), 'Clashes between republican candidates', 'Understanding in-house debates between candiates for the elections.', ['debates', 'presidents'],'3'),
    ]

    return projects;
}

function getFeaturedProjects() {
    return [makePublicProject('storedsample', 'Donald Trump and Healthcare', 'An analysis of donald trump tweets over time.', ['Topic 1', 'Topic 2'], 'fake')];
}