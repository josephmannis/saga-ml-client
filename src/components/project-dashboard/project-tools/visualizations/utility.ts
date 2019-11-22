import { IProjectData } from '../../../clientTypes';


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

export default dataTransform;

