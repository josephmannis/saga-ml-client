import React from 'react';

interface IFileUploadButtonProps {
    onFileInput: (files: FileList | null) => void;
    buttonText: string;
}


const FileUploadButton: React.FC<IFileUploadButtonProps> = props => {

    const inputWrapper = {
        display: 'inline-block',
    }

    const input = {
        fontSize: '100px',
        position: 'absolute' as 'absolute',
        left: '0',
        top: '0',
        opacity: 0,
    }

    return (
        <div style={inputWrapper}>
            <button className='btn-outline-dark'>{props.buttonText}</button>
            <input style={input} onChange={(e) => props.onFileInput(e.target.files) } name='csv' accept='.csv' type='file'/> 
        </div>
    )
}

export default FileUploadButton;