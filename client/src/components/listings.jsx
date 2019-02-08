import React from 'react';
import ListingsCarousel from './listings-carousel.jsx';
import HostListing from './hostlisting.jsx';
import Navbar from './navbar.jsx';
import $ from 'jquery';

/*
  Listings Component:
  Used when pet owners log in
  Shows all listings in the database. Also has a search (filter) function, and a link to the pet profile
  Page includes the jumbletron and the hostlisting components
*/

export default class Listings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.location.state,
      listings: [
        {
          "username":"Maria",
          "profileUrl":"https://source.unsplash.com/3wylDrjxH-E",
          "type": "host",
          "location": "Los Angeles",
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
  }

  setResults(searchresults) {
    this.setListings(searchresults);
  }

  render() {
    let listings = this.state.listings.reverse();
    let hostList = listings.map((hostsummary, index) => {
      return <HostListing key ={ index } host={ hostsummary }/>
    });
    return (
      <div>
        <Navbar link="My Account" linkurl="/pet-profile" user={this.state.user} setresults={this.setResults} search={true}/>
        <ListingsCarousel listings={this.state.listings}/>
        <div className="container">
          { hostList }
        </div>
      </div>
    )
  }
}

