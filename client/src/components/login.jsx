import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Navbar from './navbar.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToProfile: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    // fakeAuth.authenticate(() => {
      this.setState({
        redirectToProfile: true
      });
    // })
  }

  onChange (e) {
    let target = e.target.id;
    this.setState ({
      [ target ]: e.target.value
    })
  }

  handleClick (e) {
    console.log('login submitted', e.target.value);
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/login',
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

    this.login();
  }

  render () {
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile) {
      return (<Redirect to='/pet-profile'/>)
    }
    return (
      <div>
        <Navbar link="Sign Up" linkurl="/signup"/>
        <div className="row">
          <div className="col-md-5">
            <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
          </div>
          <div className="col-md-7">
            <form onSubmit={this.handleClick}>
              <h2 className="form-signin-heading">Login</h2>
                <label>
                  Username:
                  <input id='username' value={this.state.username} onChange={ this.onChange }/>
                </label>
                <label>
                  Password:
                  <input id='password' value={this.state.password} onChange={ this.onChange }/>
                </label>
                <input type='submit' value='Log In' className='submit' />
                <br />
              <Link to='/signup'>Don't have an account?</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Login;