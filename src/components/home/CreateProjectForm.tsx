import React, { KeyboardEvent, useState } from 'react';
import { Modal, Container, Col, Row, Button } from 'react-bootstrap';
import { PROJECT_CREATION_PROMPT, TOPICS_TOOLTIP } from '../../assets/strings';
import '../../styles/components/form.css';
import { Form, Input } from '@rocketseat/unform';
import CreatableSelect from 'react-select';
import { useDispatch } from "react-redux";
import { HomeActions } from '../../state/saga-home/actions';
import { Redirect } from 'react-router';
import InfoTooltip from '../global/InfoTooltip';


interface ICreateProjectFormProps {
    onFormCancelled: () => void;
    onFormCompleted: (title: string, description: string, topics: string[], ownerId: string) => void;
}

interface ICreateProjectFormState {
    topics: any;
    inputTopic: string;
}

const ConnectedCreateProjectForm: React.FC = () => {
    const [showForm, toggleForm] = useState(true);

    const dispatch = useDispatch();

    const onProjectCreated = (title: string, description: string, topics: string[], ownerId: string) => {
        const newProject = {
            type: HomeActions.CREATE_USER_PROJECT,
            projectTitle: title,
            projectDescription: description,
            projectTopics: topics,
            projectOwnerId: ownerId
        }

        dispatch(newProject);
        
        toggleForm(false);
    }

    if (showForm) {
        return(<CreateProjectForm onFormCompleted={onProjectCreated} onFormCancelled={() => toggleForm(false)} />)
    }

    return (<Redirect to='/'/>)
}

class CreateProjectForm extends React.Component<ICreateProjectFormProps, ICreateProjectFormState> {
    constructor(props: ICreateProjectFormProps) {
        super(props);
        this.state = {
            topics: [],
            inputTopic: '',
        }
    }

    // This hides the dropdown menu of the selector
    components = {
        DropdownIndicator: null
    }

    // This is to give each of the little topic labels a key. If you get rid of this, React yells at you and the labels don't display right.
    createTopic = (label: string) => ({
        label, // This HAS to be called label
        value: label
    });

    // On submit, we pull the data from the form and combine it with the topics from the state. You can integrate the topics with the form state but I'm lazy so I didn't. TODO.
    handleSumbit = (data: any) => {
        const { projectTitle, projectDescription } = data;
        const topics = this.state.topics.map((topic: any) => topic.label);

        this.props.onFormCompleted(projectTitle, projectDescription, topics, 'not yet')
    }

    // This gets called when you hit X on one of the labels. It just gives you a new value state and so we reset it to that.
    handleTopicChange = (value: any, actionMeta: any) => {
        this.setState({...this.state, topics: value});
    }
    
    // This happens when you type something in. 
    handleInputChange = (inputValue: string) => {
        this.setState({...this.state, inputTopic: inputValue});
    }

    // This is when you hit enter or tab, just adds the label that was entered to the global state. 
    handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const { inputTopic } = this.state;

        if (!inputTopic) return;

        switch(event.key) {
            case 'Enter':
            case 'Tab':
                this.setState({
                    ...this.state,
                    inputTopic: '',
                    topics: this.validateAndGetInputs(inputTopic),
                });
                event.preventDefault();
        }
    }

    validateAndGetInputs = (newInput: string) => {
        let currentTopics = this.state.topics;

        if (currentTopics.every((item: any) => item.value !== newInput)) {
             return [...currentTopics, this.createTopic(newInput)];
        }

        return currentTopics;
    }

    public render() {
        return (
            <Modal dialogClassName='formModal' show={true} onHide={() => this.props.onFormCancelled()}>
                <Modal.Header className='border-0' closeButton>
                    <h3 className='font-weight-bold px-3 pt-3'>Create Project</h3>
                </Modal.Header>
                <Modal.Body className='pt-0'>
                    <Container fluid>
                        <Row>
                            <Col xs='6' className='py-3'>
                                { PROJECT_CREATION_PROMPT }
                            </Col>
                        </Row>

                        <Col xs='10' className='p-0'>
                            <h4 className='font-weight-bold'>Details</h4>
                            <hr/>

                            <Form onSubmit={(data) => this.handleSumbit(data)}>
                                <Row>
                                    <Col xs>
                                        <h5 className='font-weight-bold'>Project Name</h5> 
                                        <Input type='text' className='form-control my-3' name='projectTitle'/>
                                    </Col>

                                    <Col xs>
                                        <h5 className='font-weight-bold'>Project Description</h5>
                                        <Input className='form-control my-3' multiline name='projectDescription'/>
                                    </Col>
                                </Row>
                               
                                <Col xs>
                                    <Row>
                                        <h5 className='font-weight-bold'>Project Topics</h5>
                                        <InfoTooltip tooltipBody={TOPICS_TOOLTIP}/>
                                    </Row>
                                </Col>
                                
                                <CreatableSelect
                                    className='my-3'
                                    isClearable
                                    isMulti
                                    components={this.components}
                                    inputValue={this.state.inputTopic}
                                    menuIsOpen={false}
                                    onChange={this.handleTopicChange}
                                    onInputChange={this.handleInputChange}
                                    onKeyDown={this.handleKeyDown}
                                    placeHolder="Type a topic and press enter to add it to the project"
                                    value={this.state.topics}
                                />

                                   <Row className='px-3 justify-content-end'>
                                        <Button variant='dark' className='my-3' type='submit'>Create Project</Button>
                                   </Row>
                            </Form>
                        </Col>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ConnectedCreateProjectForm;