import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Item, Caption } from 'react-bootstrap';
import ListingsCarousel from './listings-carousel.jsx';
import HostListing from './hostlisting.jsx';
import Navbar from './navbar.jsx';

class Listings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
  }

  render() {
    const listings = this.state.listings;
    const hostList = listings.map((hostsummary) => {
      return <HostListing host={ hostsummary } />
    });
    return (
      <div>
        <Navbar link="My Account" linkurl="/pet-profile"/>
        <ListingsCarousel listings={this.state.listings}/>
        <div className="row">
          { hostList }
        </div>
        </div>
      )
  }
}

module.exports = Listings;
