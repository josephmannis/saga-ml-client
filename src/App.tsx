import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeState } from './state/saga-home/reducers';
import Header from "./components/global/Header";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedProjectSearch } from './components/home/project-search/ProjectSearch';
import {DashboardState} from "./state/dashboard/reducers";
import ConnectedHomePage from './components/home/HomePage';
import ConnectedProjectDashboard from './components/project-dashboard/ProjectDashboard';

interface AppProps {
  home: HomeState;
  dashBoard: DashboardState;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path='/project'>
            <ConnectedProjectDashboard/>
          </Route>
          <Route path='/search'>
            <ConnectedProjectSearch />
          </Route>
          <Route path='/'>
            <ConnectedHomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
