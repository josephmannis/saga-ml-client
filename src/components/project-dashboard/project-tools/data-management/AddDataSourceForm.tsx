import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Container, Col, Button } from 'react-bootstrap';
import { ADD_DATA_SOURCE_PROMPT } from '../../../../assets/strings';
import SearchDataSourceForm from './SearchDataSourceForm';
import AddTwitterDataForm from './AddTwitterDataForm';

interface IAddDataSourceFormProps {
    onFormCompleted: () => void;
    onFormCancelled: () => void;
}

const AddDataSourceForm: React.FC<IAddDataSourceFormProps> = props => {
    const [showForm, toggleForm] = useState(true);
    const [formStep, progressStep] = useState(0);
    const dispatch = useDispatch();

    const onAddFromCSV = () => {
        
    }

    const onDataAdded = (dataRows: string[][]) => {
        console.log('data rows added');
        console.log(dataRows);
    }

    return (
        <Modal dialogClassName='formModal' show={showForm} onHide={() => props.onFormCancelled()}>
            <Modal.Body>
                <Container fluid>
                    <Row className='p-3 justify-content-between'>
                        <h3 className='font-weight-bold'>Find Data Source</h3>
                        <Button variant='outline-primary' onClick={() => onAddFromCSV()}> Add From CSV </Button>
                    </Row>
                    
                    <Row>
                        <Col xs='6' className='pb-3'>
                            { ADD_DATA_SOURCE_PROMPT }
                        </Col>
                    </Row>

                    <Col xs='10' className='p-0'>
                        {formStep === 0 && <SearchDataSourceForm onDataSourceChosen={dataSourceId => console.log(dataSourceId)} />}
                        {formStep === 1 && <AddTwitterDataForm onFormSubmitted={() => console.log('subimtted')}/>}
                    </Col>

                    <Row className='justify-content-end'>
                        <Button onClick={() => formStep === 1 ? toggleForm(false) : progressStep(formStep + 1)} > 
                            {formStep === 1 ? 'Finish' : 'Continue'}
                        </Button>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default AddDataSourceForm;