import React from 'react';
import './App.css';
import ProjectDashboard from './components/ProjectDashboard/ProjectDashboard';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <ProjectDashboard projectTitle="Healthcare" projectDescription="This is a sample project! Here is where the description would go."/>
    </div>
  );
}

export default App;
