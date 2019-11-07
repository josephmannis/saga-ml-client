import React from 'react';
import Button from 'react-bootstrap/Button';

interface HelpButtonProps {
}

const HelpButton: React.FC<HelpButtonProps> = (props) => {
    return (
      <Button className="mb-3" variant="outline-secondary" size="sm" style={{padding:'50'}} >
        ? {/*Placeholder for icon*/}
      </Button>
    )
};

export default HelpButton;
