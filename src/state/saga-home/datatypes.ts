export interface UserProject {
    projectId: string;
    projectTitle: string;
}

export interface PublishedProject {
    projectId: string; 
    projectTitle: string;
    coverImageUrl: string;
    topics: string[];
}