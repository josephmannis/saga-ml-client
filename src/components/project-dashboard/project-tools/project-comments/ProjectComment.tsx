import React from 'react';
import { IProjectComment } from '../../../clientTypes';
import { Card, Row, Col, Button } from 'react-bootstrap';
import downvote from '../../../../assets/ico/downvote.svg';
import upvote from '../../../../assets/ico/upvote.svg';


interface IProjectCommentProps {
    comment: IProjectComment;
    onUpvote: (commentId: string) => void;
    onDownvote: (commentId: string) => void;
}

const ProjectComment: React.FC<IProjectCommentProps> = props => {
    const voteIcon = {
        height: '20px',
        width: '20px'
    }
    
    const iconButton = {
        border: 'none',
        background: 'transparent'
    }

    return (
        <Card className='mb-4'>
            <Card.Body>
                <Row>
                    <Col xs='1'>
                        <button style={iconButton} onClick={() => props.onUpvote(props.comment.id)}> 
                            <img style={voteIcon} src={upvote}/>
                         </button>
                        <button style={iconButton} onClick={() => props.onDownvote(props.comment.id)}> 
                            <img style={voteIcon} src={downvote}/>
                        </button>
                    </Col>
                    <Col xs>
                        <Row className='justify-content-start'>
                            <h5 className='font-weight-bold'>{props.comment.authorId}</h5>
                            <p className='ml-3 font-smaller font-weight-light gray'>{props.comment.votes} {props.comment.votes > 1 ? 'vote' : 'votes'} </p>
                        </Row>
                        <Row className='justify-content-start text-left'>
                            <p>{props.comment.body}</p>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ProjectComment;