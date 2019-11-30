import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeState } from './state/saga-home/reducers';
import Header from "./components/global/Header";
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedProjectSearch } from './components/home/project-search/ProjectSearch';
import {DashboardState} from "./state/dashboard/reducers";
import ConnectedHomePage from './components/home/HomePage';
import ConnectedProjectDashboard from './components/project-dashboard/ProjectDashboard';
import ConnectedUserAuthPage from './components/signup/UserAuthPage';
import { UserState } from './state/user/reducers';
import {  useSelector } from 'react-redux';
import { AppState } from './state/store';

interface AppProps {
  home: HomeState;
  dashBoard: DashboardState;
  user: UserState;
}

const ConnectedApp: React.FC = () => {
  const {homeReducer, userReducer, dashboardReducer} = useSelector((state: AppState) => state);

  return(<App home={homeReducer} dashBoard={dashboardReducer} user={userReducer}/>)
}

const App: React.FC<AppProps> = props => {
  return (
    <div className="App h-100">
      <Router>
        {props.user.currentUser && <Header/> }
        {!props.user.currentUser && <Redirect to='/'/>}
        <Switch>
          <Route path='/project'>
            <ConnectedProjectDashboard/>
          </Route>
          <Route path='/search'>
            <ConnectedProjectSearch/>
          </Route>
          <Route path='/home'>
            <ConnectedHomePage/>
          </Route>
          <Route path='/'>
            <ConnectedUserAuthPage/>
          </Route>
        </Switch>
      </Router>
    </div>
    );
};

export default ConnectedApp;
