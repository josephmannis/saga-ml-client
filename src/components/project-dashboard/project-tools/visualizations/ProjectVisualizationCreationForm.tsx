import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {ADD_DATA_SOURCE_PROMPT} from "../../../../assets/strings";
import AddTwitterDataForm from "../data-management/AddTwitterDataForm";
import {useDispatch} from "react-redux";
import TypeOfVisualizationForm from "./TypeOfVisualizationForm";
import {IProjectData, IProjectVisualization, IProjectVisualizationType} from "../../../clientTypes";
import SpecifyVisualizationForm from "./SpecifyVisualizationForm";


interface IProjectVisualizationCreationFlowProps {
    onVisualiationCreated: () => void;
    onVisualizationCreationCancelled: () => void;
    data: IProjectData;
}

const ProjectVisualizationCreationForm: React.FC<IProjectVisualizationCreationFlowProps> = props => {
    const {data, onVisualizationCreationCancelled } = props;
    const [showForm, toggleForm] = useState(true);
    const [formStep, progressStep] = useState(0);
    const [chartType, setChartType] = useState(IProjectVisualizationType.LINE);
    const selectedData: IProjectData = {...data};
    const setSelectedData = (newSelectedData: IProjectData) => {
        selectedData.dataRows = newSelectedData.dataRows;
    };
    const dispatch = useDispatch();


    return (
      <Modal dialogClassName='formModal' show={showForm} onHide={() => onVisualizationCreationCancelled()}>
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
                      {formStep === 0 && <TypeOfVisualizationForm setChartType={setChartType} />}
                      {formStep === 1 && <SpecifyVisualizationForm data={data} chartType={chartType} setSelectedData={setSelectedData}/>}
                  </Col>

                  <Row className='justify-content-end'>
                      {formStep === 1 && <Button onClick={() => {console.log(selectedData)}} type='submit'>Finish</Button>}
                      {formStep < 1 && <Button onClick={() => {console.log(selectedData); return progressStep(formStep + 1)}}>Continue</Button>}
                  </Row>
              </Container>
          </Modal.Body>
      </Modal>
    );
};

export default ProjectVisualizationCreationForm;