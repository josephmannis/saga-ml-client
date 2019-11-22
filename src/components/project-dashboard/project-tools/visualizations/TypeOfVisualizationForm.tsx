import React, {useState} from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import {IDataSource, IProjectVisualizationType} from '../../../clientTypes';
import {Button} from "react-bootstrap";

interface ISearchDataSourceFormProps {
  setChartType: (chartType: number) => void;
}

const TypeOfVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
  const {setChartType} = props;

  return (
    <div style={{
      display: "flex",
      flex: 1,
    }}>
      <div style={{flex: 1,}}>
        <Button onClick={() => {
          setChartType(IProjectVisualizationType.LINE)
        }}>Line</Button>
      </div>
      <div style={{flex: 1,}}>

        <Button onClick={() => {
          setChartType(IProjectVisualizationType.PIE)
        }}>PIE</Button>
      </div>

    </div>
  )
}

export default TypeOfVisualizationForm;