import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Navbar from './navbar.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      type: '',
      redirectToProfile: false

    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onChange (e) {
    let target = e.target.id;
    console.log(target);
    this.setState ({
      [ target ]: e.target.value
    });

  }
  onSelect(e) {
    console.log(e.target.value)
    this.setState({
      type: e.target.value
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
          redirectToProfile: true,
          user: data,
          password: ''
        });
      },
      error: (data) => {
        console.log('error posting data', data);
      }
    });
  }

  render () {
    if (this.state.redirectToProfile) {
      return <Redirect to={{ pathname: '/signupform', state: this.state }} />
    }
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
                Username:
                <input id="username" placeholder="Username" value={this.state.username} onChange={this.onChange} />
              </label>
              <label>
                Password:
                <input id="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
              </label>
              <input type="submit" value="Sign Up" className="submit" /><br />
              <Link to="/login">Already have an account?</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Signup;