import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header/Header';
import Vehicle from './components/Vehicle/Vehicles';
import WatchList from './components/WatchList/WatchList';
import VehicleState from './context/VehicleContext/VehicleState';
import Bidding from './components/Bidding/Bidding';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <VehicleState>
          <Header />
          <CssBaseline />
          <Container maxWidth="lg">
            <Switch>
              <Route path="/watchList" component={WatchList} />
              <Route path="/bidding/:id" component={Bidding} />
              <Route path="/" component={Vehicle} />
            </Switch>
          </Container>
        </VehicleState>
      </div>
    </Router>
  );
}

export default App;
