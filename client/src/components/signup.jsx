import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Navbar from './navbar.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      type: 'host'
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

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {
        username: this.state.username,
        password: this.state.password,
        type: this.state.type
      },
      success: (data) => {
        console.log('ajax posting data', data);
        this.setState({
          username: '',
          password: ''
        });
      },
      error: (data) => {
        console.log('error posting data', data);
      }
    });
  }

  handleTypeChange (e) {
    this.setState({
      type: e.target.value
    });
  }

  render () {
    return (
      <div>
        <Navbar link="Login" linkurl="/login"/>
        <div className ="row">
          <div className="col-sm-5">
            <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
          </div>
          <div className="col-sm-7">
            <form onSubmit={this.handleClick}>
              <h2 className="form-signin-heading">Signup</h2>
              <label>
                Email:
                <input type="email" placeholder="Email address" required="" autoFocus="" />
              </label>
              <label>
                Username:
                <input className="username" placeholder="Username" value={this.state.username} onChange={this.onChangeUserName.bind(this)} />
              </label>
              <label>
                Password:
                <input className="password" placeholder="password" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
              </label>
              <input type="submit" value="Sign Up" className="submit" /><br />
              <div className="radio">
                <label>
                  <input type="radio" value = "host"
                  onChange={this.handleTypeChange.bind(this)}
                  checked={this.state.type === "host"}/>
                  Host
                </label>
                <label>
                  <input type="radio" value = "petOwner"
                  onChange={this.handleTypeChange.bind(this)}
                  checked={this.state.type === "petOwner"}/>
                  Pet Owner
                </label>
              </div>
              <Link to="/login">Already have an account?</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Signup;