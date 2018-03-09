import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';

/*
  Single Listing View:
  Used by login redirect and by clicking 'My Account' on listings page
  Displays currently logged in user information.
*/
class ListingProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hostName: this.props.location.state.hostName,
      location: this.props.location.state.location,
      description: this.props.location.state.description,
      ownerName: this.props.location.state.username,
      style: {backgroundColor: 'white'},
      profileUrl: this.props.location.state.profileUrl

    }
  }

   render() {
    return (
      <div>
      <h1>hello</h1>
        <p><b>Email: </b>{}</p>
        <p><b>Location: </b>{}</p>
        <p><b>Description: </b></p>
        <p className="description">{this.state.description}</p>
        <div className="card">
          <img className="card-img-top" src={this.state.profileUrl} alt="Card image cap" />
          <div className="card-block">
          <h4 className="card-title">{this.state.hostName}</h4>
          <p className="card-text">PLACE HOLDER BLAH BLAH BLAH</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
        </div>
      </div>
    )
  }
}

module.exports = ListingProfile;
