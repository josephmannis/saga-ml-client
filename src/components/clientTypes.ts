/* 
Note:

This is where all of the client side types live. The reason we have these types separate
from the types in the state folder is because if something on the API side changes, we
don't want to the client to care at all. As long as we use these types for passing data
around in our components, we can do whatever we want with the API. This is a good separation
of concerns. 

Each of these types represents a component, or more specifically, the data a component holds.

The translation between these types and the types from redux or whatever happens in the Connector
components. For instance, we could fetch a project from the API, pass that into the connector, and 
then the connector would transform that into a clientType, and pass it in as props to a 
presentational component.
*/

// A Project listing, seen in things like the homepage
export interface IProjectListing {
    id: string; // the id of the project
    title: string; // the project title
    description: string; // the description of the project
    topics: string[]; // the topics that this project uses for topic modeling
    ownerId: string; // the id of the project's owner
}

// An expanded Project that provides more information. Mostly for use with the dashboard.
export interface IProjectDashboard  {
    id: string; // the id of the project
    title: string; // the project title
    description: string; // the description of the project
    topics: string[]; // the topics that this project uses for topic modeling
    ownerId: string; // the id of the project's owner
    visualizations: IProjectVisualization[] // the list of visualizations for this project
    data: IProjectData;
    comments: IProjectComment[] // the comments on this project
}

export interface IProjectVisualization {
    id: string;
    title: string;
    description: string;
    startTime: Date; // The start of the time window of the visualization
    endTime: Date; // The end of the time window   
    type: IProjectVisualizationType; // Bar or Pie or etc
    labels: {[label: string]: string};
}

export enum IProjectVisualizationType {
    LINE, PIE
}

export interface IVisualizationDataPoint {
    timeStamp: Date; // Time the datapoint was written
    type: string; // Twitter/CSV
    text: string; // The contents of the datapoint
    tags: string[]; // The tags on the datapoint
}

// Project data 
export interface IProjectData {
    columnTitles: string[];
    dataRows: string[][];
}

export interface IDataSource {
    id: string
    title: string,
    description: string,
}

// A comment on a Project
export interface IProjectComment { 
    id: string; // the id 
    authorId: string; // the id of the author of the comment
    votes: number; // the number of votes on the comment
    body: string; // the body of the comment
    replies: string[]; // a list of ids of the reply comments
}

export interface IUser {
    id: string;
    username: string;
}