import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export interface IProjectInformationProps {
    projectTitle: string;
    projectDescription: string;
}

export default class ProjectInformation extends React.Component<IProjectInformationProps> {
  public render() {
    return (
      <Container fluid>
        <Row className="justify-content-start"> 
          <Col xs={10} sm={10} md={10} lg={10} className="justify-content-start align-content-start">
              <div className="text-left">
                <h1>{this.props.projectTitle}</h1>
                <p>{this.props.projectDescription}</p>
              </div>
          </Col>

          <Col className="align-content-center justify-content-center">
            <Button className="flex" variant="primary">Publish</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
