import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

class HostListing extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    alert(this.props.host);
  }

  render() {
    let contact = `Contact
    ` + this.props.host.username;
    return (
      <Row className="host-listing">
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
          <RaisedButton className="contact-btn" backgroundColor="#008080" labelColor="#fff" type="submit" label={contact} onClick={this.handleClick}/>
        </Col>
      </Row>
    )
  }
}

module.exports = HostListing;