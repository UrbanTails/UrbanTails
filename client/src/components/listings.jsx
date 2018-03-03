import React from 'react';
import ListingsCarousel from './listings-carousel.jsx';
import HostListing from './hostlisting.jsx';
import Navbar from './navbar.jsx';
import $ from 'jquery';

class Listings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.location.state,
      listings: []
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
    let listings = this.state.listings;
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

module.exports = Listings;
