import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import Navbar from './navbar.jsx';

class Landing extends React.Component {
  render() {
    return (
    <div>
      <Navbar link="Login" linkurl="/login"/>
      <Jumbotron>
        <div className="content">
          <h1>Urban Tails</h1>
          <h3>Pet boarding wherever your adventure takes you</h3>
          <Link to='/signup' className="btn btn-default btn-lg">Get Started</Link>
        </div>
      </Jumbotron>
    </div>
    )
  }
}

module.exports = Landing;
