import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import { Avatar } from 'material-ui';
import $ from 'jquery';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';


/*
  Lading Component:
  Used when the user first loads the website
  It shows a jumbotron with a get started button, some footer sections, and a login button on the nav bar
  Clicking Get Started routes to signup page, and clicking Login leads to login page
*/

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $.get('/logout');
  }

  handleSubmit(){
    this.props.history.push('/listings')
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
                                <input type="text" className="form-control"  placeholder="Try Blaine's Bodacious muskrat den in Denver" />
                                <span className="input-group-addon">
                                    <button type="submit" onClick={() => this.handleSubmit()}>
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
        <div className="container">
          <h2 className="heading-landing">How it works</h2>
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
          <h2 className="heading-landing">About Us</h2>
          <Row className="landing-content padded">
            <Col md={3} className="landing-box">
              <Avatar src="https://avatars3.githubusercontent.com/u/22921336?s=460&v=4" size={100}/>
              <h4>Annah Patterson</h4>
              <p>Lead Engineer</p>
            </Col>
            <Col md={3}>
              <Avatar src="https://i.pinimg.com/736x/97/27/a5/9727a533b8d35ec176155e92fd643477--pet-tattoos-wall-tattoo.jpg" size={100}/>
              <h4>Michael Shin</h4>
              <p>Scrum Master</p>
            </Col>
            <Col md={3}>
              <Avatar src="https://avatars0.githubusercontent.com/u/28540710?s=460&v=4" size={100}/>
              <h4>Queenie Smith</h4>
              <p>Product Owner</p>
            </Col>
            <Col md={3}>
              <Avatar src="https://avatars2.githubusercontent.com/u/31011353?s=400&v=4" size={100}/>
              <h4>Yufan Wang</h4>
              <p>Lead Engineer</p>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    )
  }
}

module.exports = Landing;
