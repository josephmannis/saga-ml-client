import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeState } from './state/saga-home/reducers';
import { AppState } from './state/store';
import { connect } from 'react-redux';
import HomePage from './components/home/HomePage';
import Header from "./components/global/Header";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectSearch from './components/home/project-search/ProjectSearch';
import ProjectDashboard from './components/project-dashboard/ProjectDashboard';
 

interface AppProps {
  home: HomeState;

}

const App: React.FC<AppProps> = props => {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path='/project'>
            <div>Project page</div>
          </Route>
          <Route path='/search'>
            <ProjectSearch/>
          </Route>
          <Route path='/'>
            <HomePage userProjects={props.home.userProjects} featuredProjects={props.home.featuredProjects} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  home: state.home,
});

export default connect(mapStateToProps)(App);
