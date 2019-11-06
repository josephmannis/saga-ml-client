import React from 'react';
import { IProjectModel } from '../../model';

interface IProjectDiscoveryProps {
    projects: IProjectModel[];
}

interface IProjectDiscoveryState {

}

class ProjectDiscoveryHome extends React.Component<IProjectDiscoveryProps, IProjectDiscoveryState> {
    constructor(props: IProjectDiscoveryProps) {
        super(props);

        this.state = {

        }
    }
}


export default ProjectDiscoverHome;