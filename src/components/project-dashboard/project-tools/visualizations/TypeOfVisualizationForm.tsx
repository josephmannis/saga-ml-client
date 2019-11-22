import React, { useState }  from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import { IDataSource } from '../../../clientTypes';
interface ISearchDataSourceFormProps {
    onDataSourceChosen: (dataSourceId: string) => void;
}

const TypeOfVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
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

    return (
        <div>
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

export default TypeOfVisualizationForm;