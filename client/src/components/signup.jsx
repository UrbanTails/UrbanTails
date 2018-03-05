import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: '',
      redirectToProfile: false,
      error: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.password.length < 8) {
      this.setState({
        error: 'Password must be longer than 8 characters'
      })
    } else {
      $.ajax({
        type: 'POST',
        url: '/checkuser',
        data: {
          username: this.state.username,
          password: this.state.password
        },
        success: (userexists) => {
          if (userexists) {
            this.setState({
              error: 'Username taken, please retry'
            });
          } else {
            this.setState({
              redirectToProfile: true
            });
          }
        },
        error: (data) => {
          this.setState({
            error: data.responseJSON.error
          });
        }
      });
      this.setState({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      });
    }
  }

  render() {
    let show = this.state.error ? { display: 'block', color: 'red' } : { display: 'none' };

    if (this.state.redirectToProfile) {
      return <Redirect to={{ pathname: '/signupform', state: this.state.user }} />
    }
    return (
      <div>
        <Navbar link="Login" linkurl="/login"/>
        <div className="container">
          <Row>
            <Col md={5}>
              <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
            </Col>
            <Col md={7}>
              <form onSubmit={this.handleClick}>
                <h2 className="form-signin-heading">Signup</h2>
                <div className="field-line">
                  <TextField floatingLabelText="Username" name="username" value={this.state.username} onChange={this.onChange} />
                </div>
                <div className="field-line">
                  <TextField floatingLabelText="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} />
                </div>
                <div className="field-line">
                  <RaisedButton type="submit" label="Sign Up" primary={true} />
                  <small style={ show }>{ this.state.error }</small>
                  <br/>
                  <Link to="/login">Already have an account?</Link>
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

module.exports = Signup;