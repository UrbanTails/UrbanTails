import React from 'react';
import ListingsCarousel from './listings-carousel.jsx';
import HostListing from './hostlisting.jsx';
import Navbar from './navbar.jsx';
import $ from 'jquery';
import Footer from './footer.jsx';
import ListingsMapped from './listingsMapped.jsx';


/*
  Listings Component:
  Used when pet owners log in
  Shows all listings in the database. Also has a search (filter) function, and a link to the pet profile
  Page includes the jumbletron and the hostlisting components
*/

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class Listings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.location.state,
      listings: [
        {
          "username":"Maria",
          "profileUrl":"https://source.unsplash.com/3wylDrjxH-E",
          "type": "host",
          "price": 545,
          "location": {"street": "123 S Ohio", "city": "Kansas City", "state": "MO", "zipCode":"80526"},
          "description":"I've got a wonderful patio and serve meals outside when the weather is nice."
        }
      ]
    }
    this.setResults = this.setResults.bind(this);
  }

  setListings(list) {
    this.setState({
      listings: list
    });
  }

  componentDidMount() {
    console.log('making AJAX call')
    if(!this.props.location.state.query) {
      $.ajax({
        type: 'GET',
        url: '/getlistings',
        success: (data) => {
          if (data.length > 3) {
            this.setListings(data);
          }
        },
        error: (data) => {
          console.log('error get data', data);
        }
      });
    } else {
      $.ajax({
      type: 'GET',
      url: `/getlistings?city=${this.props.location.state.query}`,
      success: (data) => {
          this.setListings(data);
      },
      error: (data) => {
        console.log('error get data', data);
      }
    });
    }

  }

  setResults(searchresults) {
    this.setListings(searchresults);
  }

  render() {
    console.log('listings state', this.props.location.state.query)
    const shuffledListings = shuffleArray(this.state.listings)
    return (
      <div>
        <Navbar link="My Account" linkurl="/host-profile" user={this.state.user} place={'/listings'} setresults={this.setResults} search={true}/>
        <ListingsCarousel />
        <div className="container">
        <br/>
          <ListingsMapped listings={shuffledListings} userName={this.state.user.username}/>
        </div>
        <br/>
        <Footer />
      </div>
    )
  }
}

//let listings = this.state.listings.reverse();
 //   let hostList = listings.map((hostsummary, index) => {
 //     return <HostListing key ={ index } host={ hostsummary } userName={this.state.user.username}/>
 //   });

module.exports = Listings;
