import React, {useState} from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import {IDataSource, IProjectData, IProjectVisualizationType} from '../../../clientTypes';
import {extractTags, filterData, getDateRange, randomColor} from './utility';
import {Button, Row, Col} from "react-bootstrap";
import {Choice} from "@rocketseat/unform";
import ProjectDataTable from "../data-management/ProjectDataTable";
import {start} from "repl";

interface ISearchDataSourceFormProps {
  setSelectedData: (data: IProjectData) => void;
  setVisualizationFields: (startDate: string, endDate: string, labels: string[]) => void;
  data: IProjectData;
}


const SpecifyVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
  const { setSelectedData, data, setVisualizationFields } = props;
  const [initStartDate, initEndDate] = getDateRange(data);
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);

  const allTags = extractTags(data);
  const [selectedTags, setSelectedTags] = useState(allTags);

  const selectedData = filterData(data, new Date(startDate), new Date(endDate), selectedTags);
  setSelectedData(selectedData);

  setVisualizationFields(startDate, endDate, selectedTags);

  const tableContainer = {
    height: '400px'
  }

  const startEndDateSelector = (
    <div>
      <h4 className='font-weight-bold'>Time Range</h4>
      <label>
        Start Date:
        <DateSelector className='form-control mr-3' date={startDate} setDate={setStartDate}/>
      </label>
      <label>
        End Date:
        <DateSelector className='form-control' date={endDate} setDate={setEndDate}/>
      </label>
    </div>
  );

  const tagToIncludeSelector =(
    <div>
      <h4 className='font-weight-bold'>Data</h4>
      <p className='mb-3'> Tags to Include: </p>
      <Col xs='3'>
        <TagSelector allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
      </Col>
    </div>
  );

  return (
    <Row>
        <Col xs>
          { startEndDateSelector }
          { tagToIncludeSelector }
        </Col>
        <Col xs>
          <h4 className='font-weight-bold'>Data Preview: </h4>

          <div style={tableContainer} className='overflow-auto'>
            <ProjectDataTable data={selectedData}/>
          </div>
        </Col>
    </Row>

  )
};

interface IDateSelector {
  date: string;
  setDate: (string: string) => void;
  className: string;
}

const DateSelector: React.FC<IDateSelector> = props => {
  const {date, setDate} = props;

  return (
    <input className={props.className} type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
    );
};

interface ITagSelector {
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: (dataTypes: string[]) => void;
}

const TagSelector: React.FC<ITagSelector> = props => {
  const { allTags, selectedTags, setSelectedTags } = props;
  const callback = (tag: string, add: boolean) => {
    if (add) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(cur => cur !== tag));
    }
  };

  return (
    <Row>
     {allTags.map(tag => <LabeledCheckBox tag={tag} callback={callback} key={tag}/>)}
    </Row>
    );
};

interface ILabeledCheckBox {
  tag: string;
  callback: (tag: string, add: boolean) => void;
}

const LabeledCheckBox: React.FC<ILabeledCheckBox> = props => {
  const { tag, callback } = props;
  return (
    <div>
    <label>
    {tag}:
    <input type="checkbox"
           name={tag}
           value={tag}
           onChange={e => callback(e.target.value, e.target.checked)}
           defaultChecked
    />
  </label>
      <br />

    </div>
  );
};

export default SpecifyVisualizationForm;