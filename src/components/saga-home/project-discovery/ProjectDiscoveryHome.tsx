import React from 'react';
import { IProjectModel } from '../../model.ts';

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


export default Component