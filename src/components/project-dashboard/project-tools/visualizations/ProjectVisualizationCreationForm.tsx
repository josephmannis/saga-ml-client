import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { IProjectData, IProjectVisualization, IProjectVisualizationType } from "../../../clientTypes";
import SpecifyVisualizationForm from "./SpecifyVisualizationForm";
import TypeOfVisualizationForm from "./TypeOfVisualizationForm";
import { extractTags, getDateRange, randomColor } from "./utility";


interface IProjectVisualizationCreationFlowProps {
    onFormCompleted: (visualization: IProjectVisualization) => void;
    onVisualizationCreationCancelled: () => void;
    data: IProjectData;
}

const ProjectVisualizationCreationForm: React.FC<IProjectVisualizationCreationFlowProps> = props => {
    const {data, onVisualizationCreationCancelled, onFormCompleted } = props;
    const [formStep, progressStep] = useState(0);
    const [chartType, setChartType] = useState(IProjectVisualizationType.LINE);
    const selectedData: IProjectData = {...data};
    const setSelectedData = (newSelectedData: IProjectData) => {
        selectedData.dataRows = newSelectedData.dataRows;
    };

    const [startTime, endTime] = getDateRange(data);

    const newVisualization: IProjectVisualization = {
        title: "Default Title",
        description: "Default Description",
        id: "fake id",
        type: chartType,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        labels: extractTags(data).reduce((obj, tag) => {return {...obj, [tag]: randomColor()}}, {})
    };

    const setVisualizationFields = (title: string, description: string, startDate: string, endDate: string, labels: string[]) => {
        newVisualization.title = title;
        newVisualization.description = description;
        newVisualization.startTime = new Date(startDate);
        newVisualization.endTime = new Date(endDate);
        newVisualization.labels = labels.reduce((obj, tag) => {return {...obj, [tag]: randomColor()}}, {})
    };

    const onSubmit = () => {
        onFormCompleted(newVisualization);
    };

    return (
      <Modal dialogClassName='formModal' show={true} onHide={() => onVisualizationCreationCancelled()}>
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

                  <Col xs className='py-5'>
                      {formStep === 0 && <TypeOfVisualizationForm selectedType={chartType} setChartType={setChartType} />}
                      {formStep === 1 && <SpecifyVisualizationForm data={data}
                                                                   setSelectedData={setSelectedData}
                                                                   setVisualizationFields={setVisualizationFields}
                      />}
                  </Col>

                  <Row className='justify-content-end'>
                      {formStep === 1 && <Button onClick={onSubmit} type='submit'>Finish</Button>}
                      {formStep < 1 && <Button onClick={() => progressStep(formStep + 1)}>Continue</Button>}
                  </Row>
              </Container>
          </Modal.Body>
      </Modal>
    );
};

export default ProjectVisualizationCreationForm;