import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import CustomInputPicker from '../../../shared/CustomInputPicker';


interface IAddTwitterDataFormProps {
    onFormSubmitted: (startDate: string, endDate: string, handles: string[], hashtags: string[]) => void;
}

const AddTwitterDataForm: React.FC<IAddTwitterDataFormProps> = props => {
    const [hastagValues, updateHashtags] = React.useState<string[]>([]);
    const [handleValues, updateHandles] = React.useState<string[]>([]);
    
    const onFormSubmitted = (data: any) => {
        
    }

    return (
        <Form onSubmit={data => onFormSubmitted(data)}>
            <h5 className='font-weight-bold'>Start Date</h5> 
            <Input type='date' className='form-control py-3' name='startDate'/>

            <h5 className='font-weight-bold'>End Date</h5> 
            <Input type='date' className='form-control py-3' name='endDate'/>

            <h5 className='font-weight-bold'>Handles</h5> 
            <CustomInputPicker placeHolder='Add twitter handles' onValuesChanged={values => updateHandles(values)}/>

            <h5 className='font-weight-bold'>Hashtags</h5> 
            <CustomInputPicker placeHolder='Add twitter hashtags' onValuesChanged={values => updateHashtags(values)}/>
        </Form>
    )
}

export default AddTwitterDataForm;