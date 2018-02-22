import React from 'react';
import { Route, IndexRoute, hashHistory, browserHistory, Router } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Landing from './landing.jsx';


class App extends React.Component {
  render () {
    return (
      <div>
        <Route path='*' component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </div>
    )
  }

  
}

module.exports = App;


