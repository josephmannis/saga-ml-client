import React, {useState} from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import {IDataSource, IProjectData, IProjectVisualizationType} from '../../../clientTypes';
import { extractTags, filterData } from './utility';
import {Button} from "react-bootstrap";
import {Choice} from "@rocketseat/unform";
import ProjectDataTable from "../data-management/ProjectDataTable";
import {start} from "repl";

interface ISearchDataSourceFormProps {
  chartType: number;
  setChartState: (IProjectVisualization: {}) => void;
  data: IProjectData;
}

const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const years = Array.from(Array(20).keys()).map(i => {
  return i += 2000
});



const SpecifyVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
  const { chartType, setChartState, data } = props;
  const [visPreview, setVisPreview] = useState({});
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2019-12-31");

  const allTags = extractTags(data);
  const [selectedTags, setSelectedTags] = useState(allTags);

  const selectedData = filterData(data, startDate, endDate, selectedTags);

  const startEndDateSelector = (
    <div>
      Time Range
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
      <label>
        Tags to Include:
        <TagSelector allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
      </label>
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

{/*<Choice name={"tags to include"}*/}
{/*        options={choiceFormat}*/}
{/*        multiple*/}
{/*        onChange={e => console.log(e.target.value)}*/}
{/*/>*/}

interface ILabeledCheckBox {
  tag: string;
  callback: (tag: string, add: boolean) => void;
}

const LabeledCheckBox: React.FC<ILabeledCheckBox> = props => {
  const { tag, callback } = props;
  return (<label>
    {tag}:
    <input type="checkbox"
           name={tag}
           value={tag}
           onChange={e => callback(e.target.value, e.target.checked)}
           defaultChecked
    />
  </label>);
};

export default SpecifyVisualizationForm;