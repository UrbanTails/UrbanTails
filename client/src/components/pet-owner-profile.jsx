import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';

/*
  PetProfile Component:
  Used by login redirect and by clicking 'My Account' on listings page
  Displays currently logged in user information.
*/

export default class PetProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.location.state.username,
      profileUrl: this.props.location.state.profileUrl,
      description: this.props.location.state.description,
      location: this.props.location.state.location,
      email: this.props.location.state.email
    }
  }

  render() {
    return (
      <div>
        <Navbar link="Logout" linkurl="/" />
        <div className="well"></div>
        <Row>
          <Col style={{ paddingLeft: '10%' }} md={4}>
              <div className="profileimg"><img src={this.state.profileUrl} /></div>
          </Col>
          <Col style={{ paddingLeft: '10%' }} md={5}>
              <h3>{this.state.username}</h3>
              <p>
                <b>Guest Rating: </b>
                <i className="material-icons md-24 ratings">pets</i>
                <i className="material-icons md-24 ratings">pets</i>
                <i className="material-icons md-24 ratings">pets</i>
                <i className="material-icons md-24 ratings">pets</i>
                <i className="material-icons md-24 ratings">pets</i>
              </p>
              <p><b>Email: </b>{this.state.email}</p>
              <p><b>Location: </b>{this.state.location}</p>
              <p><b>Description: </b></p>
              <p className="description">{this.state.description}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

