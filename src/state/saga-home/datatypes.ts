import { IUser } from "../../components/model";

export interface UserProject {
    projectId: string;
    projectTitle: string;
    topics: string[];
    owner: IUser;
}

export interface PublishedProject {
    projectId: string; 
    projectTitle: string;
    coverImageUrl: string;
    topics: string[];
}