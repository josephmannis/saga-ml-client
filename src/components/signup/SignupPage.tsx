import React from 'react';
import {Col, Row, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import { Form, Input } from '@rocketseat/unform';

const ConnectedSignupPage: React.FC = () => {
    const onSignup = (username: string, password: string) => {

    }

    return (
        <SignupPage onSignup={(username, password) => onSignup(username, password)}/>
    )
}

interface ISignupPageProps {
    onSignup: (username: string, password: string) => void;
}


const SignupPage: React.FC<ISignupPageProps> = props => {
    const onSignup = (data: any) => {
        props.onSignup(data.username, data.password);
    }

    return (
        <Container fluid className='h-100 p-5'>
            <Col xs>
                <Row>
                    <Col xs='4' className='bg-dark-gray'>
                    </Col>
                    <Col xs>
                        <Row className='justify-content-center'>
                            <Col xs='4'>
                                <img src={logo}/>
                                <h3 className='font-weight-bold'>saga.ml</h3>
                                <Form onSubmit={data => onSignup(data)}>
                                    <h5>email</h5>
                                    <Input className='form-control' name='email' placeholder='email' type='email'/>
                                    <h5>password</h5>
                                    <Input className='form-control' name='password' placeholder='email' type='password'/>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Container>
    )
}

export default ConnectedSignupPage;