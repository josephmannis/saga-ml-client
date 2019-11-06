import react from './node_modules/react'


interface IProjectVisualizationCreationFlowProps {
}

interface IProjectVisualizationCreationFlowState {
    currentStep: number;
}

// This essentially will work by this: https://css-tricks.com/the-magic-of-react-based-multi-step-forms/
class ProjectVisualizationCreationFlow extends React.Component<IProjectVisualizationCreationFlowProps, IProjectVisualizationCreationFlowState> {
constructor(props: IProjectVisualizationCreationFlowProps) {
super(props);
this.state = {
    currentStep: 0,
}
}
}

export default ProjectVisualizationCreationFlow