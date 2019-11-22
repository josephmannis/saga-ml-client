import React, { useState } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { ADD_DATA_SOURCE_PROMPT } from '../../../../assets/strings';
import { Form, Input } from '@rocketseat/unform';
import CustomInputPicker from '../../../shared/CustomInputPicker';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import { IDataSource } from '../../../clientTypes';

interface IAddDataSourceFormProps {
    onFormCompleted: (data: string[][]) => void;
    onFormCancelled: () => void;
}

const AddDataSourceForm: React.FC<IAddDataSourceFormProps> = props => {
    const [formStep, progressStep] = useState(0);
    const [hashtagValues, updateHashtags] = React.useState<string[]>([]);
    const [handleValues, updateHandles] = React.useState<string[]>([]);
    
    const onAddFromCSV = (data: any) => {
        console.log(data)
    }

    const onDataAdded = (dataRows: any) => {
        // TODO: Fakey fake fake. Faker. 
        props.onFormCompleted(
            [
                ['I want nothing. I want nothing. I want no quid pro quo. Tell zellinsky to do the right thing. This is the final word from the pres of the u.s.', '10/5/19', 'education'],
                ['Despite the constant negative press covfefe', '10/7/19', 'education']
            ]
        );
    }

    return (
        <Container fluid>
            <Row className='p-3 justify-content-between'>
                    <h3 className='font-weight-bold'>Find Data Source</h3>
                <Form onSubmit={data => onAddFromCSV(data)}>
                    <Input name='csv' type='file'/> 
                </Form>
                </Row>
                <Row>
                    <Col xs='6' className='pb-3'>
                        { ADD_DATA_SOURCE_PROMPT }
                    </Col>
                </Row>

                <Col xs='10' className='p-0'>
                    <SearchDataSourceForm currentStep={formStep === 0} onDataSourceChosen={dataSourceId => console.log(dataSourceId)} />
                </Col>

                <Form onSubmit={data => onDataAdded(data)}>
                    <Col xs='10' className='p-0'>
                        <AddTwitterDataForm currentStep={formStep === 1} onHandleUpdate={values => updateHandles(values)} onHashtagUpdate={values => updateHashtags(values)}/>
                    </Col>
                <Row className='justify-content-end'>
                    {formStep === 1 && <Button type='submit'>Finish</Button>}
                    {formStep < 1 && <Button onClick={() => progressStep(formStep + 1)}>Continue</Button>}
                </Row>
            </Form>
        </Container>
    )
}

interface IAddTwitterDataFormProps {
    currentStep: boolean;
    onHandleUpdate: (values: string[]) => void;
    onHashtagUpdate: (values: string[]) => void;
}

const AddTwitterDataForm: React.FC<IAddTwitterDataFormProps> = props => {
    if (props.currentStep) {
        return (
            <div>
                <h5 className='font-weight-bold mb-3'>Start Date</h5> 
                <Input type='date' className='form-control py-3' name='startDate'/>
    
                <h5 className='font-weight-bold mb-3'>End Date</h5> 
                <Input type='date' className='form-control py-3' name='endDate'/>
    
                <h5 className='font-weight-bold mb-3'>Handles</h5> 
                <CustomInputPicker placeHolder='Add twitter handles' onValuesChanged={values => props.onHandleUpdate(values)}/>
    
                <h5 className='font-weight-bold'>Hashtags</h5> 
                <CustomInputPicker placeHolder='Add twitter hashtags' onValuesChanged={values => props.onHashtagUpdate(values)}/>
            </div>
        )
    }

    return null;
} 


interface ISearchDataSourceFormProps {
    currentStep: boolean;
    onDataSourceChosen: (dataSourceId: string) => void;
}

const SearchDataSourceForm: React.FC<ISearchDataSourceFormProps> = props => {
    const [searchResults, updateResults] = useState<IDataSource[]>([]);
    const [selectedResult, selectResult] = useState('');

    const onSearch = (query: string) => {
        updateResults([
            {
                title: 'Twitter',
                description:  'Pull data from certain Twitters, Hashtags, and more.',
                id: 'twt'
            }
        ])
    } 

    if (props.currentStep) {
        return (
            <div >
                <SearchBar hintText='Search for data source' onSearch={query => onSearch(query)}/>
                { searchResults.map((result, i) =>
                        <SearchResult 
                            key={i} 
                            selected={selectedResult === result.id}
                            itemTitle={result.title} 
                            itemDescription={result.description} 
                            itemId={result.id} 
                            onItemClicked={id => selectResult(id)}/>)
                }
            </div>
        )
    }

    return null;
}

export default AddDataSourceForm;