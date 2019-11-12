interface IUser {
    id: string;
    username: string;
}

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
