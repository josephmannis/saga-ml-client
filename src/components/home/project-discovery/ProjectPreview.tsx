import React from 'react';
import { Card, CardImg } from 'react-bootstrap';

interface IPublishedProjectProps {
    imageUrl: string;
    title: string;
    description: string;
    projectId: string;
    onProjectSelected: (id: string) => void;
}

const PublishedProject: React.FC<IPublishedProjectProps> = props => {
    const getRandomGradientUrl = () => {
        let gradientId = Math.floor(Math.random() * (333 - 0 + 1)) + 0;

        return `https://gradientjoy.com/200x150?id=${gradientId}`;
    }
    
    return (
        <button onClick={() => props.onProjectSelected(props.projectId)} className='bg-transparent border-0 p-0'>
            <Card className='text-left rounded-lg'>
                <CardImg src={getRandomGradientUrl()}/>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </button>
    )
}

export default PublishedProject;