import React from 'react';
import {Card, Row, Col, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';


interface IProjectResultProps {
    projectTitle: string;
    projectDescription: string;
    projectTopics: string[];
}


const ProjectResult: React.FC<IProjectResultProps> = props => {
    return (
        <Link className='text-reset text-decoration-none' to='/project'>
            <Card className='text-left'>
                <Row className='justify-content-between p-3'>
                    <Col xs>
                        <Card.Title>{props.projectTitle}</Card.Title>
                        <Card.Text>{props.projectDescription}</Card.Text>
                    </Col>

                    <Col xs='3'>
                        {props.projectTopics.map((topic: string) => <Badge className='m-1' variant='dark'>{topic}</Badge>)}
                    </Col>
                </Row>
            
            </Card>
        </Link>
    )
}

export default ProjectResult