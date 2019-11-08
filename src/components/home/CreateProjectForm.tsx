import React, { KeyboardEvent } from 'react';
import { Modal, Container, Col, Row, Button } from 'react-bootstrap';
import { PROJECT_CREATION_PROMPT } from '../../assets/strings';
import '../../styles/components/form.css';
import { Form, Input } from '@rocketseat/unform';
import CreatableSelect from 'react-select';
import { thisTypeAnnotation } from '@babel/types';


interface ICreateProjectFormProps {
    onFormCancelled: () => void;
    onFormCompleted: (projectTitle: string, projectTopics: string[], projectDescription: string) => void;
}

interface ICreateProjectFormState {
    showForm: boolean;
    topics: any;
    inputTopic: string;
}



class CreateProjectForm extends React.Component<ICreateProjectFormProps, ICreateProjectFormState> {
    constructor(props: ICreateProjectFormProps) {
        super(props);
        this.state = {
            showForm: true,
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
        console.log({...data, topics: this.state.topics});

        this.props.onFormCompleted(
            data.projectTitle,
            data.projectDescription,
            this.state.topics
        )

        this.setState({showForm: false});
    }

    // This gets called when you hit X on one of the labels. It just gives you a new value state and so we reset it to that.
    handleTopicChange = (value: any, actionMeta: any) => {
        console.log('Changing topic');
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
            <Modal dialogClassName='formModal' show={this.state.showForm} onHide={() => this.props.onFormCancelled()}>
                <Modal.Header  closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                                        <Input className='form-control my-3' name='projectTitle'/>
                                    </Col>

                                    <Col xs>
                                        <h5 className='font-weight-bold'>Project Description</h5>
                                        <Input className='form-control my-3' multiline name='projectDescription'/>
                                    </Col>
                                </Row>
                               
                                <h5 className='font-weight-bold'>Project Topics</h5>
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

export default CreateProjectForm;