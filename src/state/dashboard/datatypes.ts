export interface DataPoint {
    timeStamp: Date; // Time the datapoint was written
    type: string; // Twitter/CSV
    text: string; // The contents of the datapoint
    tags: string[]; // The tags on the datapoint
}

export interface IVisualization {
    title: string;
    description: string;
    startTime: Date; // The start of the time window of the visualization
    endTime: Date; // The end of the time window
    tagsToInclude: string[]; // What tags to include datapoints off
    typesToInclude: string[]; // What types of datapoints to render
    type: string; // Bar or Pie or etc
}

export interface ProjectDashboard {
    projectId: string; // unique id
    title: string; // Human title
    description: string; // Description of the project
    topics: string[]; // Tags for the project
    dataPoints: DataPoint[]; // All the data points for the project
    visualizations: IVisualization[] // All the visualizations
}