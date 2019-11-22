import React, {useState} from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import {IDataSource, IProjectData, IProjectVisualizationType} from '../../../clientTypes';
import {extractTags, filterData, getDateRange, randomColor} from './utility';
import {Button} from "react-bootstrap";
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


  const startEndDateSelector = (
    <div>
      Time Range
      <br />
      <label>
        Start Date:
        <DateSelector date={startDate} setDate={setStartDate}/>
      </label>
      <label>
        End Date:
        <DateSelector date={endDate} setDate={setEndDate}/>
      </label>
    </div>
  );

  const tagToIncludeSelector =(
    <div>
      Data
      <br />
      <div>
        Tags to Include:
        <br />
        <TagSelector allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
      </div>
    </div>
  );

  return (
    <div style={{
      display: "flex",
      flex: 1,
    }}>
      <div style={{flex: 1,}}>
        { startEndDateSelector }
        { tagToIncludeSelector }
      </div>
      <div style={{flex: 1,}}>
        Data Preview:
        <ProjectDataTable data={selectedData}/>
      </div>
    </div>
  )
};

interface IDateSelector {
  date: string;
  setDate: (string: string) => void;
}

const DateSelector: React.FC<IDateSelector> = props => {
  const {date, setDate} = props;

  return (
    <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
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
    <div>
     {allTags.map(tag => <LabeledCheckBox tag={tag} callback={callback} key={tag}/>)}
    </div>
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