import React from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './landing.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import SignupForm from './signupform.jsx';
import PetProfile from './pet-owner-profile.jsx';
import HostProfile from './hostprofile.jsx';
import Listings from './listings.jsx';
import singleListView from './singleListView.jsx'
import Listing from './listing.jsx';

/*
  App Component:
  Routes to all other components
*/

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Landing } />
        <Route path='/signup' component={ Signup } />
        <Route path='/signupform' component={ SignupForm } />
        <Route path='/login' component={ Login } />
        <Route path='/pet-profile' component={ PetProfile } />
        <Route path='/host-profile' component={ HostProfile } />
        <Route path='/listings' component={ Listings } />
        <Route path='/singlelistview' component={ singleListView } />
        <Route path='/listing' component={ Listing } />
      </div>
    )
  }
}

module.exports = App;


