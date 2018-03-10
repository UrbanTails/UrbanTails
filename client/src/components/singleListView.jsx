import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';
import Searchbar from './searchbar.jsx';
import Footer from './footer.jsx';

import Checkout from './checkout.jsx';
import Calendar from './calendar.jsx';

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
    {console.log(this.props)}
    return (
      <div>
        <Navbar user={this.state.user} search={true}/>

        <Col md={5} className="host-content" >
          <h2>Your Pet's adventure awaits.</h2>

          <img style={{ width: '1000px', height: '400px'}} className="card-img-top" src={this.state.profileUrl} alt="Card image cap" />

          <div style={{marginBottom: '20px'}}>
            <i className="material-icons md-5 ratings">pets</i>
            <i className="material-icons md-5 ratings">pets</i>
            <i className="material-icons md-5 ratings">pets</i>
            <i className="material-icons md-5 ratings">pets</i>
            <i className="material-icons md-5 ratings">pets</i>
          </div>

          <div class = "container">

            <div class = "row">

              <div class="col-xs-7" >
                <h2>{this.props.location.state.location.street + ', ' + this.props.location.state.location.city + ', ' + this.props.location.state.location.state + ', ' + this.props.location.state.location.zipCode}</h2>
                <h4>{this.state.description}</h4>
                <div>
                  <h3>{this.state.hostName}</h3>
                  <h5>Email: {this.state.email}</h5>        
                  <div>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                  </div>
                </div>

                <div className="cardButton">
                  {/*<Checkout
                    classname= "checkout"
                    name={'Your Freedom Awaits'}
                    description={'Ask about becoming a host'}
                    amount={1}
                  />
                  <p className="card-text">We only accept Cash</p>
                */}
                </div>
              </div>

              <div class="col-xs-5">
                <Calendar
                hostName= {this.state.hostName}
                location= {this.state.location}
                description= {this.state.description}
                userName= {this.state.userName}
                />
              </div>

            </div>

          </div>

        <div>Map
          <Container address={'891 Uinta Way, Denver, CO'}/>
          </div>

        </Col>




        <br/>

        <Footer/>
      </div>
      
    )
  }
}

module.exports = ListingProfile;
