import React from 'react';


interface IProjectVisualizationCreationFlowProps {
    onVisualiationCreated: () => void;
    onVisualizationCreationCancelled: () => void;
}

interface IProjectVisualizationCreationFlowState {
    
}

class ProjectVisualizationCreationFlow extends React.Component<IProjectVisualizationCreationFlowProps, IProjectVisualizationCreationFlowState> {
    constructor(props: IProjectVisualizationCreationFlowProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return (<div></div>
        );
    }
}

export default ProjectVisualizationCreationFlow;