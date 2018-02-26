import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx';

class Landing extends React.Component {
  render() {
    return (
    <div>
      <Navbar link="Login" linkurl="/login"/>
      <div>
      <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
      <Link to='/signup'>Get Started</Link>
      </div>
    </div>
    )
  }
}

module.exports = Landing;
