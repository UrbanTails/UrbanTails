import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';
import Container from './container.jsx'

/*
  Single Listing View:
  Used by login redirect and by clicking 'My Account' on listings page
  Displays currently logged in user information.
*/
class ListingProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

   render() {
    return (
      <div>
      <h1>hello</h1>
        <p><b>Email: </b>{}</p>
        <p><b>Location: </b>{}</p>
        <p><b>Description: </b></p>
        <p className="description">{}</p>
        <div className="card">
          <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLC01FdlSDkgdpP28PNUWxqSUbC_mQ7K04mamOmzC98RWMaoZK1A" alt="Card image cap" />
          <div className="card-block">
          <h4 className="card-title">Animal Test</h4>
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
        <div>
          <div>Map</div>
          <Container/>
        </div>
      </div>
    )
  }
}

module.exports = ListingProfile;
