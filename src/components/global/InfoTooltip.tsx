import React from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';


interface IInfoTooltipProps {
    tooltipBody: string;
}

const InfoTooltip: React.FC<IInfoTooltipProps> = props => {
    const tooltip = (values: any) => {
        return (<Tooltip className='text-left' {...values}>{props.tooltipBody}</Tooltip>)
    }
    return ( 
        <OverlayTrigger
            placement='right'
            delay={{show: 100, hide: 200}}
            overlay={tooltip}>
            <div style={{height: '30px', width: '30px'}} className='text-secondary border text-center rounded-circle font-weight-bold mx-3'>?</div>
        </OverlayTrigger>
    )
}

export default InfoTooltip;