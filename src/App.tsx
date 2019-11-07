import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeState } from './state/saga-home/reducers';
import { AppState } from './state/store';
import { connect } from 'react-redux';
import HomePage from './components/home/HomePage';
import Header from "./components/Global/Header";

interface AppProps {
  home: HomeState;
}

const App: React.FC<AppProps> = props => {
  return (
    <div className="App">
      <Header/>
      <HomePage userProjects={props.home.userProjects} featuredProjects={props.home.featuredProjects} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  home: state.home,
})

export default connect(mapStateToProps)(App);
