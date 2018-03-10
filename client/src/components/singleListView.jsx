import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';
import Searchbar from './searchbar.jsx';
import Footer from './footer.jsx';
import Checkout from './checkout.jsx';
import Calendar from './calendar.jsx';
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
      userName: this.props.location.state.userName,
      profileUrl: this.props.location.state.profileUrl,
      email: this.props.location.state.email,
      style: {backgroundColor: 'white'}
    }
  }

   render() {
    return (
      <div>
        <Navbar user={this.state.user} search={true}/>

        <Col md={5} className="host-content" >
          <h2>Your Pet's adventure awaits.</h2>

          <img style={{ width: '600px', height: '500px'}} className="card-img-top" src={this.state.profileUrl} alt="Card image cap" />

          <div>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
          </div>

          <h2>{this.state.location}</h2>
          <h4>{this.state.description}</h4>
          <div>
            <h3>{this.state.hostName}</h3>
            <h4><b>Email: </b>{this.state.email}</h4>
          </div>

          <div>
            <Calendar
            hostName= {this.state.hostName}
            location= {this.state.location}
            description= {this.state.description}
            userName= {this.state.userName}
            />
          </div>

          <Checkout
            classname= "checkout"
            name={'Your Freedom Awaits'}
            description={'Ask about becoming a host'}
            amount={1}
          />

          <p className="card-text">We only accept Cash</p>

        </Col>

        <Footer/>
      </div>
    )
  }
}

module.exports = ListingProfile;
