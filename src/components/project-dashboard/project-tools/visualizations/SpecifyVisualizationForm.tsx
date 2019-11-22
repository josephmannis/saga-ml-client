import React, {useState} from 'react';
import SearchBar from '../../../shared/SearchBar';
import SearchResult from '../../../home/project-search/SearchResult';
import {IDataSource, IProjectData, IProjectVisualizationType} from '../../../clientTypes';
import {Button} from "react-bootstrap";

interface ISearchDataSourceFormProps {
  chartType: number;
  setChartState: (IProjectVisualization: {}) => void;
  projectData: IProjectData;
}

const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const years = Array.from(Array(20).keys()).map(i => {
  return i += 2000
});

const extractTags = (data: IProjectData): string[]  => {

  return [];
};

const SpecifyVisualizationForm: React.FC<ISearchDataSourceFormProps> = props => {
  const { chartType, setChartState, projectData } = props;
  const [visPreview, setVisPreview] = useState({});
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2019-12-31");

  const allTags = extractTags(projectData);
  const [selectedTags, setSelectedTags] = useState(allTags);

  return (
    <div style={{
      display: "flex",
      flex: 1,
    }}>
      <div style={{flex: 1,}}>
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
        <div>
          Data
          <label>
            Tags to Include:
            <TagSelector allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
          </label>
        </div>
      </div>
      <div style={{flex: 1,}}>
        test2s
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

  return (
    <label>
    Check Me!
  </label>
);
};

export default SpecifyVisualizationForm;