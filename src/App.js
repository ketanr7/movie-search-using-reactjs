import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './components/loader.jsx'

import './App.scss';

import Header from './components/header/header';
import HomePage from './components/homePage/homePage';
import DetailsPage from './components/detailsPage/detailsPage';
import ScrollTopArrow from './components/scrollTopArrow';

const App = () => {
  const loading = useSelector((state) => state.movies.loading)
  let location = useLocation();
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      { location.pathname === "/" ? <Header /> : null}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/details/:movieId' component={DetailsPage} />
      </Switch>
      <ScrollTopArrow />
    </div>
  );
};

export default App;

