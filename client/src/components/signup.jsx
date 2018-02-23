import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  onChangeUserName (e) {
    this.setState ({
      username: e.target.value
    });
  }

  onChangePassword (e) {
    this.setState ({
      password: e.target.value
    });
  }

  handleClick (e) {
    e.preventDefault();

    this.setState({
      username: '',
      password: ''
    });

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: (data) => {
        console.log('ajax posting data', data);
      },
      error: (data) => {
        console.log('error posting data', data);
      }
    });
  }

  render () {
    return (
      <div>
        <nav>Urban Tails</nav>
        <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
        <form onSubmit={this.handleClick}>
          <label>
            Username:
            <input className='username' value={this.state.username} onChange={this.onChangeUserName.bind(this)} />
          </label>
          <label>
            Password:
            <input className='password' value={this.state.password} onChange={this.onChangePassword.bind(this)} />
          </label>
            <input type='submit' value='Sign Up' className='submit' /><br />
          <Link to='/login'>Already have an account?</Link>
        </form>
      </div>
    )
  }
}

module.exports = Signup;