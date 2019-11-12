import React from 'react';
import ProjectResult from './ProjectResult';
import { Col, Row } from 'react-bootstrap';
import { IProjectListing } from '../../clientTypes';


interface IProjectSearchResultsProps {
    projectResults: IProjectListing[];
    onItemClicked: (projectId: string) => void;
}

export const ConnectedProjectSearch: React.FC = () => {
    // Bad and fake news
    const projectResults = [
        {
            id: 'not real',
            title: 'fake',
            coverImageUrl: 'www.fake.com',
            description: 'Presidential Debates of Donald Trump',
            topics: ['trump', 'healthcare'],
            ownerId: '3'
        }
    ]

    const onProjectSelected = (projectId: string) => {
        console.log('navigate to project with id' + projectId)
    }

    return (
        <ProjectSearchResults projectResults={projectResults} onItemClicked={onProjectSelected}/>
    )
}

const ProjectSearchResults: React.FC<IProjectSearchResultsProps> = props => {
    return (
        <Row className='justify-content-center'>
            <Col className='p-3 text-left' xs='6'>
                <h2 className='font-weight-bold'>Search Results</h2>
                <p>1 Result</p>
                {props.projectResults.map((result) => <ProjectResult project={result} onItemClicked={itemId => props.onItemClicked(itemId)}  />)}
            </Col>
        </Row>
    )
}

export default ConnectedProjectSearch;