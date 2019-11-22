import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {ADD_DATA_SOURCE_PROMPT} from "../../../../assets/strings";
import AddTwitterDataForm from "../data-management/AddTwitterDataForm";
import {useDispatch} from "react-redux";
import TypeOfVisualizationForm from "./TypeOfVisualizationForm";


interface IProjectVisualizationCreationFlowProps {
    onVisualiationCreated: () => void;
    onVisualizationCreationCancelled: () => void;
}

interface IProjectVisualizationCreationFlowState {

}

const ProjectVisualizationCreationForm: React.FC<IProjectVisualizationCreationFlowProps> = props => {
    const [showForm, toggleForm] = useState(true);
    const [formStep, progressStep] = useState(0);
    const dispatch = useDispatch();

    const onAddFromCSV = () => {

    }

    return (
      <Modal dialogClassName='formModal' show={showForm} onHide={() => props.onVisualizationCreationCancelled()}>
          <Modal.Body>
              <Container fluid>
                  <Row className='p-3 justify-content-between'>
                      <h3 className='font-weight-bold'>Create Visualization</h3>
                  </Row>

                  <Row>
                      <Col xs='6' className='pb-3'>
                          { "What are you trying to represent?" }
                      </Col>
                  </Row>

                  <Col xs='10' className='p-0'>
                      {formStep === 0 && <TypeOfVisualizationForm onDataSourceChosen={dataSourceId => console.log(dataSourceId)} />}
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
    );
};

export default ProjectVisualizationCreationForm;