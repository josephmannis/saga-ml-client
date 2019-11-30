import React from 'react';
import {Col, Row, Container, Button } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import { Form, Input } from '@rocketseat/unform';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../state/store';
import { login, signup } from '../../state/user/actions';

const ConnectedUserAuthPage: React.FC = () => {
    const { currentUser } = useSelector((state: AppState) => state.userReducer);

    const onSignup = (username: string, password: string) => {
        signup(username, password);
    }

    const onLogin = (username: string, password: string) => {
        login(username, password);
    }
    
    if (currentUser) {
        return (<Redirect to='/home'/>);
    }

    return (
        <UserAuthPage 
            onSignup={(username, password) => onSignup(username, password)}
            onLogin={(username, password) => onLogin(username, password)}
        />
    )
}

interface IUserAuthPageProps {
    onSignup: (username: string, password: string) => void;
    onLogin: (username: string, password: string) => void;
}


const UserAuthPage: React.FC<IUserAuthPageProps> = props => {
    const [isLogin, toggleLogin] = React.useState(false);

    const onSubmit = (data: any) => {
        isLogin ? props.onLogin(data.username, data.password) : props.onSignup(data.username, data.password);
    }

    return (
        <Container fluid className='h-100'> 
            <Col xs className='h-100'>
                <Row className='justify-content-center align-items-center h-100'>
                    <Col lg='4' sm='6' xs='8' className='shadow p-5 rounded'>
                        <Col xs className='text-center'>
                            <img className='mb-4 mx-5' src={logo}/>
                            <h3 className='font-weight-bold mb-4'>saga.ml</h3>
                        </Col>
                        <Col xs className='text-left'>
                            <Form onSubmit={data => onSubmit(data)}>
                                <h5 className='mb-3'>username</h5>
                                <Input required className='form-control mb-4' name='username' placeholder='username'/>
                                <h5 className='mb-3'>password</h5>
                                <Input required className='form-control mb-4' name='password' placeholder='email' type='password'/>
                                <Button className='mb-4' type='submit'>{isLogin ? 'Login' : 'Sign up'}</Button>
                                <p>
                                    {isLogin ? 'don\'t have an account?' : 'already have an account?' }
                                    <Button variant='link' onClick={() => toggleLogin(!isLogin)}> {isLogin ? 'sign up' : 'log in' }</Button>
                                </p>
                            </Form>
                        </Col>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}

export default ConnectedUserAuthPage;