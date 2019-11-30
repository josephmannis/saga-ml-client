import React from 'react';
import SearchResult from './SearchResult';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { IProjectListing } from '../../clientTypes';
import { AppState } from '../../../state/store';
import { Redirect } from 'react-router';


interface IProjectSearchResultsProps {
    projectResults: IProjectListing[];
    onItemClicked: (projectId: string) => void;
}

export const ConnectedProjectSearch: React.FC = () => {
    const [ selectedProject, selectProject ] = React.useState(false);
    const { searchResults } = useSelector((state: AppState) => state.searchReducer )

    const onProjectSelected = (projectId: string) => {
        selectProject(true);
    }

    console.log(searchResults)

    return (
        <div>
            {selectedProject && <Redirect to='/project'/>}
            <ProjectSearchResults projectResults={searchResults} onItemClicked={onProjectSelected}/>
        </div>    
    )
}

const ProjectSearchResults: React.FC<IProjectSearchResultsProps> = props => {
    let results = props.projectResults;

    return (
        <Row className='justify-content-center'>
            <Col className='p-3 text-left' xs='6'>
                <h2 className='font-weight-bold'>Search Results</h2>
                <p>{results.length} Results </p>
                {results.map((result) => <SearchResult itemTitle={result.title} itemDescription={result.description} itemTags={result.topics} itemId={result.id} onItemClicked={itemId => props.onItemClicked(itemId)}  />)}
            </Col>
        </Row>
    )
}

export default ConnectedProjectSearch;