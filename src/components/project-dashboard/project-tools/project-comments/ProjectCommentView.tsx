import React from 'react';
import { IProjectComment } from '../../../clientTypes';
import { useDispatch } from 'react-redux';
import { DashboardActions } from '../../../../state/dashboard/actions';
import ConnectedProjectCommentList from './ProjectCommentList';
import { Col, Row, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';


interface IConnectedProjectCommentViewProps {
    comments: IProjectComment[];
}

interface IProjectCommentViewProps extends IConnectedProjectCommentViewProps {
    onCommentAdded: (comment: string, commenterId: string) => void;
}

export const ConnectedProjectCommentView: React.FC<IConnectedProjectCommentViewProps> = props => {
    const dispatch = useDispatch();

    const onCommentAdded = (comment: string, id: string) => {
        const newComment = {
            type: DashboardActions.ADD_PROJECT_COMMENT,
            authorId: id,
            comment: comment,
          }

        dispatch(newComment);
    }

    return (
       <ProjectCommentView comments={props.comments} onCommentAdded={(comment, commenterId) => onCommentAdded(comment, commenterId) }/>
    )
}

const ProjectCommentView: React.FC<IProjectCommentViewProps> = props => {
    const onCommentAdded = (commentData: any) => {
        props.onCommentAdded(commentData.commentBody, 'You');
    }

    return (
        <Col xs='8'>
            <Col xs className='text-left py-5'>
                <h3 className='font-weight-bold'>{props.comments.length} {props.comments.length > 1 ? 'Comments' : 'Comment'} </h3>
                <Form className='justify-content-between mt-5' onSubmit={data => onCommentAdded(data)}>
                    <Row>
                        <Col xs>
                            <Input className='form-control' type='text' name='commentBody' placeholder='Leave a comment...'/>
                        </Col>
                        <Col xs='1'>
                            <Button type='submit'>Post</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
           
            <ConnectedProjectCommentList comments={props.comments}/>
        </Col>
    )
}

export default ProjectCommentView;