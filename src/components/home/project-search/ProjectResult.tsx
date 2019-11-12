import React from 'react';
import {Card, Row, Col, Badge} from 'react-bootstrap';
import { IProjectListing } from '../../clientTypes';


interface IProjectResultProps {
    project: IProjectListing;
    onItemClicked: (itemId: string) => void;
}

const ProjectResult: React.FC<IProjectResultProps> = props => {
    return (
        <Card onClick={() => props.onItemClicked(props.project.id)} className='text-left'>
            <Row className='justify-content-between p-3'>
                <Col xs>
                    <Card.Title>{props.project.title}</Card.Title>
                    <Card.Text>{props.project.description}</Card.Text>
                </Col>

                <Col xs='3'>
                    {props.project.topics.map((topic: string) => <Badge className='m-1' variant='dark'>{topic}</Badge>)}
                </Col>
            </Row>
        </Card>
    )
}

export default ProjectResult