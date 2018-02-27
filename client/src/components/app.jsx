import React from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './landing.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import PetProfile from './pet-owner-profile.jsx';
import HostProfile from './hostprofile.jsx';
import Listings from './listings.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Landing } />
        <Route path='/signup' component={ Signup } />
        <Route path='/login' component={ Login } />
        <Route path='/pet-profile' component={ PetProfile } />
        <Route path='/host-profile' component={ HostProfile } />
        <Route path='/listings' component={ Listings } />
      </div>
    )
  }
}

module.exports = App;


