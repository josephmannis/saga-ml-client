import React from 'react';
import { Table } from "react-bootstrap"
import { IProjectData } from "../../../clientTypes"

interface IProjectDataTableProps {
    data: IProjectData;
}

export const ProjectDataTable: React.FC<IProjectDataTableProps> = props => {
    return (
        <Table responsive striped hover className='border-top-0 text-left'>
              <thead>
                <tr>
                  {props.data.columnTitles.map((title, i) => <th key={i}>{title}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  props.data.dataRows.map((row, i) => <tr key={i}>{row.map((col, i) => <td key={i}> {col} </td>)}</tr>)
                }
              </tbody>

        </Table>
    )
}

export default ProjectDataTable;