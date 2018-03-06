import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

/*
  Login Component:
  Link on landing and signup pages
  Redirects to user profile (host or owner) on successful post to server
  Displays errors if form is not properly validated
*/

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      username: '',
      password: '',
      redirectToProfile: false,
      user: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        redirectToProfile: true,
        user: this.props.location.state.user
      });
    }
  }

  login(userData) {
    this.setState({
      redirectToProfile: true,
      user: userData
    });
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value,
      errors: {}
    });
  }

  handleClick(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: (data) => {
        console.log(data.errors);
        if (data.errors) {
          console.log(data.errors)
          this.setState({
            errors: data.errors
          });
        } else {
          this.login(data[0]);
        }
      },
      error: (data) => {
        console.log(data);
        this.setState({
          errors: data.responseJSON.errors
        });
      }
    });
  }

  render() {
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile) {
      if (this.state.user.type === 'host') {
        return(<Redirect to={{ pathname: '/host-profile', state: this.state.user }}/>)
      } else {
        return (<Redirect to={{ pathname: '/listings', state: this.state.user }}/>)
      }
    }
    return (
      <div>
        <Navbar link="Sign Up" linkurl="/signup"/>
        <div className="container">
          <Row>
            <Col md={5}>
              <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
            </Col>
            <Col md={7} className="form-container">
              <form onSubmit={this.handleClick}>
                <h2 className="form-signin-heading">Login</h2>
                <div className="field-line">
                  <TextField floatingLabelText="Username" name="username" value={this.state.username} onChange={this.onChange} errorText={ this.state.errors.username }/>
                </div>
                <div className="field-line">
                  <TextField floatingLabelText="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} errorText={ this.state.errors.password }/>
                </div>
                <div className="field-line">
                  <RaisedButton type="submit" label="Login" primary={true} />
                  <br/>
                  <Link to="/signup">Don't have an account?</Link>
                </div>
              </form>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    )
  }
}

module.exports = Login;