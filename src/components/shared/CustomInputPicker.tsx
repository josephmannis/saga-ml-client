import React, {useState, useEffect} from 'react';
import CreatableSelect from 'react-select';

// TODO: Debug this
interface ICustomInputPickerProps {
    placeHolder: string;
    onValuesChanged: (values: string[]) => void;
}

interface ICreatableSelectInput {
    label: string;
    value: string;
}

const components = {
    DropdownIndicator: null
}

const CustomInputPicker: React.FC<ICustomInputPickerProps> = props => {
    const [currentItems, updateItems] = useState<ICreatableSelectInput[]>([]);
    const [currentInput, updateInput] = useState('');

    const formatInput = (label: string) => ({
        label, // This HAS to be called label
        value: label
    });

    // This gets called when you hit X on one of the labels. It just gives you a new value state and so we reset it to that.
    const handleTopicChange = (value: any, actionMeta: any) => {
        console.log(value);
        if (value) {
            updateItems(value);
        }
    }
    
    // This happens when you type something in. 
    const handleInputChange = (inputValue: string) => {
        updateInput(inputValue);
    }

    // This is when you hit enter or tab, just adds the label that was entered to the global state. 
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (!currentInput) return;

        switch(event.key) {
            case 'Enter':
            case 'Tab':
                updateInput('');
                updateItems(validateAndGetInputs(currentInput));
                event.preventDefault();
        }
    }

    const validateAndGetInputs = (newInput: string) => {
        console.log(`input:` + newInput)
        if (currentItems.every((item: any) => item.value !== newInput)) {
             return [...currentItems, formatInput(newInput)];
        }
                
        return currentItems;
    }

    useEffect(() => {
        console.log(currentItems.map(input => input.value));
        props.onValuesChanged(currentItems.map(input => input.value));
    }, [currentItems]);
    
    return (
        <CreatableSelect
            className='my-3'
            isClearable
            isMulti
            components={components}
            inputValue={currentInput}
            menuIsOpen={false}
            onChange={handleTopicChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeHolder={props.placeHolder}
            value={currentItems}
        />
    )
}

export default CustomInputPicker;