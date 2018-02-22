import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
    <div>
      <nav>Urban Tails <Link to='/login'>Log In</Link></nav>

      <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
      <Link to='/signup'>Get Started</Link>
    </div>
    )
  }
}

module.exports = Landing;
