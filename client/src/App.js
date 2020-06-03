import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customTheme from './utils/customTheme';

import Login from './login/Login';
import Register from './register/Register';
import Dashboard from './dashboard/Dashboard';
import Chart from './chart/ChartContainer';
import Survey from './survey/Survey';
import Page404 from './reusable/page404';

const NoMatch = ({ location }) => (
  <Page404 badUrl={location.pathname} />
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/chart/:id' component={Chart} />
            <Route path='/survey' component={Survey} />
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
