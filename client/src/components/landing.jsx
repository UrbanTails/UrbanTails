import React from 'react';
import { browserHistory } from 'react-router';

class Landing extends React.Component {
  render() {
    return (
    <div>
      <nav>Urban Tails <button className='login'>Log In</button></nav>

      <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
      <button className='signup'>Get Started</button>
    </div>
    )
  }
}

module.exports = Landing;
