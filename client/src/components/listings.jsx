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
      listings: [
        {
          "username":"Maria",
          "profileUrl":"https://source.unsplash.com/3wylDrjxH-E",
          "type": "host",
          "location": "Los Angeles",
          "description":"I've got a wonderful patio and serve meals outside when the weather is nice."
        },
        {
          "username":"Jon",
          "profileUrl":"https://source.unsplash.com/b37mDyPzdJM",
          "type": "host",
          "location": "Los Angeles",
          "description":"Located in the heart of Santa Monica, your pet will love the social scene with tons of people and pets to meet."
        },
        {
          "username":"Mira",
          "profileUrl":"https://source.unsplash.com/_-JR5TxKNSo",
          "type": "host",
          "location": "New York",
          "description":"Best spot in the West Village, just steps from the dog park."
        }
      ]
    }
  }

  componentDidMount() {
    // let context = this;
    // $.get('/listings', (err, data) => {
    //   context.setState({
    //     listings: data
    //   });
    // });
    // console.log('mounted');
    $.ajax({
      type: 'GET',
      url: '/listingAll',
      success: (data) => {
        // console.log('ajax get data', data);
        this.setState({
          listings: data
        });
      },
      error: (data) => {
        console.log('error get data', data);
      }
    });
  }

  


  render() {
    const listings = this.state.listings;
    const hostList = listings.map((hostsummary, index) => {
      return <HostListing key ={ index } host={ hostsummary } />
    });
    return (
      <div>
        <Navbar link="My Account" linkurl="/pet-profile" user={ this.state.user } search={ true }/>
        <ListingsCarousel listings={ this.state.listings }/>
        <div className="row">
          { hostList }
        </div>
      </div>
    )
  }
}

module.exports = Listings;
