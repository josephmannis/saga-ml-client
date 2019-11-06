import { Url } from "url";

export interface IPublishedProject {
    projectId: string; 
    projectTitle: string;
    coverImage: Url;
}

export interface IProject {
    id: string;
    owner: IUser;
    title: string;
    description: string;
    visualizations: IProjectVisualization[];
    data: IProjectData;
    comments: IComment[];
    topics: string[];
}

export interface IProjectData {
     dataRows: string[];
     columnTypes: IColumnType[];
}

export interface IColumnType {
    type: ColumnType;
    label: string; 
}

enum ColumnType {
    number = 'number',
    string = 'string',
}

export interface IProjectVisualization {
    
}

export interface IComment {
    id: string;
    postedBy: IUser;
    votes: number;
    replies: IComment[];
}

export interface IUser {
    id: string;
    username: string;
}