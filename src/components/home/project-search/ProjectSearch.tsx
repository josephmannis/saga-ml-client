import React from 'react';
import { PublishedProject } from '../../../state/saga-home/datatypes';
import ProjectResult from './ProjectResult';
import { Col, Row } from 'react-bootstrap';


interface IProjectSearchProps {
    projectResults: PublishedProject[];
}

// Bad and fake news
const projectResults = [
    {
        projectId: 'fake',
        projectTitle: 'Presidential Debates of Donald Trump',
        coverImageUrl: 'no',
        topics: ['trump', 'healthcare']
    }
]

const ProjectSearch: React.FC<IProjectSearchProps> = props => {
    return (
        <Row className='justify-content-center'>
            <Col className='p-3 text-left' xs='6'>
                <h2 className='font-weight-bold'>Search Results</h2>
                <p>1 Result</p>
                {projectResults.map((result) => <ProjectResult projectTitle={result.projectTitle} projectDescription={'the one and only study about donald trump'} projectTopics={result.topics} />)}
            </Col>
        </Row>
    )
}

export default ProjectSearch;