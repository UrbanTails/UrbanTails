import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';
import Searchbar from './searchbar.jsx';
import Footer from './footer.jsx';
import Checkout from './checkout.jsx'
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
      profileUrl: this.props.location.state.profileUrl,
      email: this.props.location.state.email

    };
  }

   render() {
    return (
      <div>
        <Navbar user={this.state.user} search={true}/>
        <h1>Your Pet's adventure awaits.</h1>
        <h3>Location: {this.props.location.state.location.street + ', ' + this.props.location.state.location.city + ', ' + this.props.location.state.location.state + ', ' + this.props.location.state.location.zipCode}</h3>
        <h3><p>Description: </p></h3>
        <h4><p className="description">{this.state.description}</p></h4>
        <div className="card">
          <img className="card-img-top" src={this.state.profileUrl} alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">{this.state.hostName}</h4>
            <p><b>Email: </b>{this.state.email}</p>
            <Checkout
            name={'Your Freedom Awaits'}
            description={'Ask about becoming a host'}
            amount={1}
            />
            <p className="card-text">We only accept Cash</p>
            <a href="#" className="btn-lg btn-primary">Book</a>
          </div>
        </div>
        <div>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
        </div>
        <br/>
        <Footer/>
      </div>
    )
  }
}

module.exports = ListingProfile;
