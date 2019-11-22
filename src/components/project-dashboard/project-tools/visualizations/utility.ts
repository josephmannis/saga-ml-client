import { IProjectData } from '../../../clientTypes';
import {start} from "repl";


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

const dataTransform = (projectData: IProjectData) => {
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
          acc[tag][curDate].t = dateOfRowToDate(curDate);
          acc[tag][curDate].y = 0;
        }
        acc[tag][curDate].y += 1;
      });
      return acc;
  }, {});

  const datasetsToInclude = Object.keys(tagToDataSet)
    .map(tag => {return {label: tag, data: Object.values(tagToDataSet[tag])}})

  datasetsToInclude
    .forEach(cur => {cur.data.sort((a, b) => b.t.getTime() - a.t.getTime())});

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
  console.log(tagsOfRow);
  console.log(tagsList);
  return tagsOfRow.some(tag => tagsList.includes(tag));
};

const filterData = (data: IProjectData, startDateString: string, endDateString: string, tags: string[]): IProjectData  => {
  const { columnTitles, dataRows } = data;
  const tagIdx = getTagsColumnIndex(data);
  const dateIdx = getDateColumnIndex(data);
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const filterFunc = (row: string[]) => {
    return dateInRange(new Date(row[dateIdx]), startDate, endDate)
      && rowHasTagFromTagList(tagsOfRow(row, tagIdx), tags);
  };

  const filteredDataRows: string[][] = dataRows.filter(filterFunc);
  console.log(filteredDataRows);
  return {columnTitles, dataRows: filteredDataRows};
};

const getDateRange = (data: IProjectData): string[] => {
  return ["2000-01-01", "2019-12-31"];
};


export { dataTransform, extractTags, filterData, getDateRange };

