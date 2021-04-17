import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route,useLocation,withRouter  } from 'react-router-dom';

import './App.scss';

import Header from './components/header/header';
import HomePage from './components/homePage/homePage';
import DetailsPage from './components/detailsPage/detailsPage';

const App = () => {
  let location = useLocation();
  return (
    <div>
      { location.pathname == "/" ? <Header/>: null}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/details/:movieId' component={DetailsPage} />
      </Switch>
    </div>
  );
};

export default App;

