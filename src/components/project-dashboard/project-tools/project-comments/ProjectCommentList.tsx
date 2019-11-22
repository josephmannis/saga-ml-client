import React from 'react';
import { IProjectComment } from '../../../clientTypes';
import { Col } from 'react-bootstrap';
import ProjectComment from './ProjectComment';
import { useDispatch } from 'react-redux';
import { DashboardActions } from '../../../../state/dashboard/actions';


interface IConnectedProjectCommentListProps {
    comments: IProjectComment[];
}

const ConnectedProjectCommentList: React.FC<IConnectedProjectCommentListProps> = props => {
    const dispatch = useDispatch();

    const onCommentUpvoted = (commentID: string) => {
        dispatch(
            {
                type: DashboardActions.UPVOTE_PROJECT_COMMENT,
                commentId: commentID
            }
        )
    }

    const onCommentDownvoted = (commentID: string) => {
        dispatch(
            {
                type: DashboardActions.DOWNVOTE_PROJECT_COMMENT,
                commentId: commentID
            }
        )
    }

    return (
        <ProjectCommentList comments={props.comments} onCommentUpvoted={id => onCommentUpvoted(id)} onCommentDownvoted={id => onCommentDownvoted(id)}/>
    )
}

interface IProjectCommentListProps extends IConnectedProjectCommentListProps {
    comments: IProjectComment[];
    onCommentUpvoted: (commentID: string) => void;
    onCommentDownvoted: (commentID: string) => void;
}

const ProjectCommentList: React.FC<IProjectCommentListProps> = props => {
    return (
        <Col xs>
            {props.comments.map((comment, i) => <ProjectComment key={i} comment={comment} onUpvote={(id) => props.onCommentUpvoted(id)} onDownvote={(id) => props.onCommentDownvoted(id)}/>)}
        </Col>
    )
}

export default ConnectedProjectCommentList;