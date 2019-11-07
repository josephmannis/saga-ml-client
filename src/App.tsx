import React from 'react';
import './App.css';
import ProjectDashboard from './components/project-dashboard/ProjectDashboard';
import 'bootstrap/dist/css/bootstrap.css';
import { IProject } from './components/model';
import Header from "./components/Global/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <ProjectDashboard project={ getSampleProject() }/>
    </div>
  );
};

function getSampleProject(): IProject {
  return (
    {
      id: 'no', 
      owner: {id: 'joe', username: 'jo1'},
      title: 'Healthcare',
      description: 'Sample project',
      visualizations: [],
      data: {dataRows: [[''],['']], columnTypes: []},
      comments: [],
      topics: []
    }
     
  )
}

export default App;
