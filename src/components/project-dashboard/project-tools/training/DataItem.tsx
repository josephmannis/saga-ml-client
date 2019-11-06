import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { IProjectData } from '../../../model';

interface IDataItemProps {
    model: IProjectData;
}

const DataItem: React.FC<IDataItemProps> =
 ({model}) => (
    <Card>
        <Container fluid className='p-3'>

        </Container>
     </Card>
)  

export default DataItem
