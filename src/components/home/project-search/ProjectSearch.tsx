import React from 'react';


interface IProjectSearchProps {

}

interface IProjectSearchState {

}

class ProjectSearch extends React.Component<IProjectSearchProps, IProjectSearchState> {
    constructor(props: IProjectSearchProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return (
            <div>Search</div>
        );
    }
}

export default ProjectSearch;