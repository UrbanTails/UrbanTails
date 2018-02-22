import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';


class App extends React.Component {

  logIn () {
    window.location = '/login.jsx'
  }


  render () {
    return (
      <div>
        <nav>Urban Tails <button className='login' onClick={this.logIn()}>Log In</button></nav>
       
        <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
        <button className='signup'>Get Started</button>
      </div>
    )
  }
}

module.exports = App;