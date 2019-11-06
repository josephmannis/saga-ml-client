import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from '../../../Shared/Filters';
import SearchBar from '../../../Shared/SearchBar';
import DataItem from './DataItem';
import DataItemModel from './model/DataItemModel';

export interface IProjectTrainingViewProps {
  dataItems: Array<DataItemModel>
}

export default class ProjectTrainingView extends React.Component<IProjectTrainingViewProps> {
  public render() {
    return (
      <Container fluid className='p-5'>
      <Row>
          <Col className='justify-content-center'>
            <Filters filters={['Healthcare', 'Trump', 'Republican', 'Democrat', 'Feminism', 'Economics', 'Debate']}/>
          </Col>

          <Col xs={8} sm={8} md={8} lg={8} className='text-left'>
            <SearchBar hintText="Search for Data Items"/>
            <p>{this.props.dataItems.length} Item</p>
            {this.props.dataItems.map(item => <DataItem model={item}/>)}
          </Col>
      </Row>
    </Container>
    );
  }
}
