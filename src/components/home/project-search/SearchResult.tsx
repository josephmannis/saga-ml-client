import React from 'react';
import {Card, Row, Col, Badge} from 'react-bootstrap';


interface ISearchResultProps {
    itemTitle: string;
    itemDescription: string;
    itemTags?: string[];
    itemId: string;
    onItemClicked: (itemId: string) => void;
    selected?: boolean;
}

const SearchResult: React.FC<ISearchResultProps> = props => {
    return (
        <Card onClick={() => props.onItemClicked(props.itemId)} className={'my-3 text-left ' + (props.selected ? 'border border-primary' : '')}>
            <Row className='justify-content-between p-3'>
                <Col xs>
                    <Card.Title>{props.itemTitle}</Card.Title>
                    <Card.Text>{props.itemDescription}</Card.Text>
                </Col>

                <Col xs='3'>
                    {props.itemTags && props.itemTags.map((topic: string) => <Badge className='m-1' variant='dark'>{topic}</Badge>)}
                </Col>
            </Row>
        </Card>
    )
}

export default SearchResult