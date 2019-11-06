import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from '../../../Shared/Filters';
import SearchBar from '../../../Shared/SearchBar';
import DataSearchResult from './DataSearchResult';

export interface IProjectDataManagementViewProps {}

export default class ProjectDataManagementView extends React.Component<IProjectDataManagementViewProps> {
  public render() {
    return (
      <Container fluid className='p-5'>
        <Row>
            <Col className='justify-content-center'>
              <Filters filters={['Social', 'Academic', 'Database']}/>
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} className='text-left'>
              <SearchBar hintText="Search for Data Sources"/>
              <p>1 Result</p>
              <DataSearchResult title='Twitter' description='Pull data from certain Twitters, Hashtags, and more.' tags={['Social']}/>
            </Col>
        </Row>
      </Container>
    );
  }
}
