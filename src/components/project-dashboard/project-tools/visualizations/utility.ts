import {
  IProjectData,
  IProjectVisualization,
  IProjectVisualizationType,
  IVisualizationDataPoint
} from '../../../clientTypes';
import {start} from "repl";
import {transcode} from "buffer";


const getTagsColumnIndex = (projectData: IProjectData): number => {
  return projectData.columnTitles.indexOf("tags");
};

const getDateColumnIndex = (projectData: IProjectData): number => {
  return projectData.columnTitles.indexOf("date");
};

const tagsOfRow = (row: string[], idx: number): string[] => {
  const tagsString = row[idx];
  return tagsString.split(",").map(str => str.trim());
};

const dateOfRow = (row: string[], idx: number): string => {
  const dateString = row[idx];
  const dateDate = new Date(dateString);
  return dateDate.getFullYear() + "-" + dateDate.getDate();
};

const dateOfRowToDate = (dateOfRow: string): Date => {
  const [year, month] = dateOfRow.split("-").map(i => parseInt(i));
  return new Date(year, month);
};

interface ITransformedDataPoint {
  label: string,
  data: {t: Date; y: number;}[];
}

interface ITransformedData {
 datasets: ITransformedDataPoint[];
}
//{label: string, data: {t: Date; y: number;}[]}[]
const dataTransform = (projectData: IProjectData): ITransformedData  => {
  const tagIdx = getTagsColumnIndex(projectData);
  const dateIdx = getDateColumnIndex(projectData);

  interface tagToFrequency {
    [tag: string]: {
      [date: string]: {
        t: Date;
        y: number;
      };
    }
  }

  let tagToDataSet: tagToFrequency =
    projectData.dataRows.reduce((acc: tagToFrequency, curRow: string[]) => {
      const curTags = tagsOfRow(curRow, tagIdx);
      const curDate = dateOfRow(curRow, dateIdx);
      curTags.forEach((tag: string) => {
        if (!acc[tag]) {
          acc[tag] = {};
        }
        if (!acc[tag][curDate]) {
          acc[tag][curDate] = {t: dateOfRowToDate(curDate), y: 0};
        }
        acc[tag][curDate].y += 1;
      });
      return acc;
  }, {});

  const datasetsToInclude = Object.keys(tagToDataSet)
    .map(tag => {return {label: tag, data: Object.values(tagToDataSet[tag])}});

  datasetsToInclude
    .forEach(cur => {cur.data.sort((a, b) => b.t.getTime() - a.t.getTime())});

  return {datasets: datasetsToInclude};
};

interface ISummedData {
  labels: string[];
  datasets: [
    {
      data: number[];
    }
  ]
}

const sumTransformedData = (transformedData: ITransformedData): ISummedData => {
  return {
    labels: transformedData.datasets.map(obj => obj.label),
    datasets: [
      {
        data: transformedData.datasets.map(obj => obj.data.reduce((a, b) => a + b.y, 0))
      }],
  };
};

const extractTags = (data: IProjectData): string[]  => {
  const tagIdx = getTagsColumnIndex(data);
  const tags: string[] = Array.from(new Set(data.dataRows.flatMap(
    curRow => tagsOfRow(curRow, tagIdx)
  )));
  return tags;
};

const dateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date > startDate && date < endDate;
};

const rowHasTagFromTagList = (tagsOfRow: string[], tagsList: string[]): boolean => {
  return tagsOfRow.some(tag => tagsList.includes(tag));
};

const filterData = (data: IProjectData, startDate: Date, endDate: Date, tags: string[]): IProjectData  => {
  const { columnTitles, dataRows } = data;
  const tagIdx = getTagsColumnIndex(data);
  const dateIdx = getDateColumnIndex(data);

  const filterFunc = (row: string[]) => {
    return dateInRange(new Date(row[dateIdx]), startDate, endDate)
      && rowHasTagFromTagList(tagsOfRow(row, tagIdx), tags);
  };

  const filteredDataRows: string[][] = dataRows.filter(filterFunc);
  return {columnTitles, dataRows: filteredDataRows};
};

const getDateRange = (data: IProjectData): string[] => {
  return ["2000-01-01", "2019-12-31"];
};

const formatDataForVis = (data: IProjectData, vis: IProjectVisualization): object => {
  const filteredData = filterData(data, vis.startTime, vis.endTime, Object.keys(vis.labels));
  const transformedData = dataTransform(filteredData);
  switch (vis.type) {
    case IProjectVisualizationType.LINE:
      return {datasets: transformedData.datasets.map(obj => {return {...obj, borderColor: vis.labels[obj.label]}})};//.map(obj => {return {...obj, borderColor: vis.labels[obj.label]}})
    case IProjectVisualizationType.PIE:
      const summedData = sumTransformedData(transformedData);
      return {datasets: [{data: summedData.datasets[0].data, backgroundColor: Object.values(vis.labels)}], labels: summedData.labels};
    default:
      return {}
  }
};


const randomColor = (): string => {
  return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6); //https://stackoverflow.com/a/1152508
};


export { dataTransform, extractTags, filterData, getDateRange, formatDataForVis, randomColor };

