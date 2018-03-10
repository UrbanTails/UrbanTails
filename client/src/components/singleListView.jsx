import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Navbar from './navbar.jsx';
import Searchbar from './searchbar.jsx';
import Footer from './footer.jsx';

import { Link, Redirect } from 'react-router-dom';




import Checkout from './checkout.jsx';
import Calendar from './calendar.jsx';
import Container from './container.jsx'

/*
  Single Listing View:
  Used by login redirect and by clicking 'My Account' on listings page
  Displays currently logged in user information.
*/


class SingleListView extends React.Component {
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
    };
  }

   render() {
    return (
      <div>
        <Navbar user={this.state.user} search={true}/>
        <div>
          <Link
            className="btn btn-default btn-lg"
            to={{
            pathname: '/listings',
            state: { username: this.state.username}
            }}>
          Listings
          </Link>
        </div>
        <Col md={5} className="host-content" >
          <h2>Your Pet's adventure awaits.</h2>

          <img style={{ width: '1000px', height: '400px'}} className="card-img-top" src={this.state.profileUrl} alt="Card image cap" />

          <div class = "container">

            <div class = "row">

              <div class="col-xs-6" >
                <h2>{this.props.location.state.location.street + ', ' + this.props.location.state.location.city + ', ' + this.props.location.state.location.state + ', ' + this.props.location.state.location.zipCode}</h2>
                <h4>{this.state.description}</h4>
                <div>

                  <div>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                      <i className="material-icons md-24 ratings">pets</i>
                  </div>
                </div>

                <div>
                  <Container address={this.props.location.state.location.street + ', ' + this.props.location.state.location.city + ', ' + this.props.location.state.location.state}/>
                </div>

              </div>

              <div class="col-xs-5 col-md-offset-1">
                <Calendar
                email= {this.state.email}
                hostName= {this.state.hostName}
                location= {this.state.location}
                description= {this.state.description}
                userName= {this.state.userName}
                profileUrl= {this.state.profileUrl}
                />

              </div>
            </div>
          </div>


        </Col>

        <br/>

        <Footer/>
      </div>

    )
  }
}

module.exports = SingleListView;
