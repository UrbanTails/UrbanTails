import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';
import { Link, Redirect } from 'react-router-dom';

/*
  HostListing Component:
  Used on listings page
  Individual listings that show a profile image, name, location,
  description, and contact button
  When contact button is clicked, the contact email is displayed
*/

class HostListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContact: false,
      style: {backgroundColor: 'white'}
    };
    this.handleClick = this.handleClick.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.handleSubmit = this.handleSubmit.bind();
  }

  handleClick() {
    console.log(this.props);
    this.setState({
      showContact: !this.state.showContact
    });
  }

  handleSubmit(){
    this.props.history.push('/singleListView');
  }

  mouseOut() {
    this.setState({style: {backgroundColor: 'white'}});
  }

  mouseOver() {
    this.setState({style: {backgroundColor: '#f7f7f7'}});
  }

  render() {
    let contact = 'Contact ' + this.props.host.username;
    return (
      <Row className="host-listing" style={this.state.style} onMouseLeave={this.mouseOut} onMouseEnter={this.mouseOver} onClick={this.handleClick}>
        <Col md={5}>
          <img style={{ width: '300px', height: '250px'}} className="" src={this.props.host.profileUrl}/>
        </Col>
        <Col md={5} className="host-content" >
          <h2>{this.props.host.username}</h2>
          <h5>{this.props.host.location}</h5>
          <p>{this.props.host.description}</p>
          <div>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
          </div>
          <p></p>
          <div className="contact-btn-container">
            <Link to={{ pathname: '/singlelistview', state: {hostName: this.props.host.username, location: this.props.host.location, description: this.props.host.description, profileUrl: this.props.host.profileUrl}}} className="btn btn-default btn-lg">View Listing</Link>
          </div>
        </Col>
      </Row>
    )
  }
}

module.exports = HostListing;

// <RaisedButton className="contact-btn" backgroundColor="#008080" labelColor="#fff" type="submit" label={ this.state.showContact ? this.props.host.email : contact } onClick={this.handleClick}/>
// <Link to='/singleListView'>view page</Link>