import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { Avatar } from 'material-ui';
import $ from 'jquery';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import LandingGridList from './landingGridList.jsx';

/*
  Lading Component:
  Used when the user first loads the website
  It shows a jumbotron with a get started button, some footer sections, and a login button on the nav bar
  Clicking Get Started routes to signup page, and clicking Login leads to login page
*/

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    $.get('/logout');
  }

  handleSubmit(){
    this.props.history.push({
      pathname:'/listings', state: {user: { username: 'Anonymous'}, query:this.state.query}
    });
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  //Change Get started Button link to /listings to send user directly to listings
  render() {

    return (
      <div>
        <Navbar link="Login" linkurl="/login"/>
        <Jumbotron>
          <div className="content">
            <h1>Urban Tails</h1>
            <h3>Pet boarding wherever your adventure takes you</h3>
            <div className="container">
              <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div id="imaginary_container">
                            <div className="input-group large stylish-input-group">
                                <input style={{width: "500px",height: "75px"}}type="text" className="form-control"  placeholder="Try Blaine's Bodacious muskrat den in Denver" value={this.state.query} onChange={this.handleChange.bind(this)}/>
                                <span className="input-group-addon">
                                    <button style={{width: "50px",height: "62px"}} type="submit" onClick={() => this.handleSubmit()}>
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </Jumbotron>
          <div className="row">
            <LandingGridList />
          </div>

        <div className="container">
          <Row className="landing-content">

            <Col md={3}>
              <i className="material-icons md-36">face</i>
              <h3>Start</h3>
              <p>Create a free profile as either a pet owner or a host for pets</p>
            </Col>
            <Col md={3}>
              <i className="material-icons md-36">autorenew</i>
              <h3>Connect</h3>
              <p>Searching for places to stay or open your home to host pets and their owners.</p>
            </Col>
            <Col md={3}>
              <i className="material-icons md-36">today</i>
              <h3>Plan</h3>

              <p>Choose a listing and plan your stay or manage your bookings.</p>
            </Col>
            <Col md={3}>
              <i className="material-icons md-36">thumb_up</i>
              <h3>Share</h3>
              <p>Share your experience and help build a community of animal lovers.</p>
            </Col>
          </Row>
          <hr/>
        </div>
        <Footer />
      </div>
    )
  }
}


module.exports = Landing;
