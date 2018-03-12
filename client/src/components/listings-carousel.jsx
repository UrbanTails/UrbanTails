import React from 'react';
import { Carousel, Item, Caption } from 'react-bootstrap';

/*
  ListingCarousel Component:
  Used on listings page
  Shows top 3 listings, or less, given an array of listings from the listings page state
*/

class ListingCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let feature = [


  {
    username:"Chuckie's colorado pad",
    email: "summersun@hamptons.com",
    password: "waterbaby",
    profileUrl:"http://boulderhg.com/wp-content/uploads/2008/01/sculpturehouse-intro1.jpg",
    type: "host",
    location: {street: "6464 E Temp Lane", city: "Honolulu", state: "HI", zipCode:"33442"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await!"
  },

  {
    username:"Thee Robin Kim pet spa",
    email: "spookykim@bates.com",
    password: "naptime",
    profileUrl:"http://homesoftherich.net/wp-content/uploads/2013/10/Screen-shot-2013-10-18-at-10.44.09-AM.png",
    type: "host",
    location: {street: "6464 E Temp Lane", city: "Honolulu", state: "HI", zipCode:"33442"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await.."
  },
  {
    username:"The Norbie Adventure",
    email: "yoga@lemon.org",
    password: "booklover",
    profileUrl:"https://cdn.vox-cdn.com/uploads/chorus_asset/file/4873925/Screen_20Shot_202014-07-02_20at_2010.20.23_20PM.0.png",
    type: "host",
    location: {street: "482 W Davidson Lane", city: "Columbus", state: "OH", zipCode:"82398"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"Paula by Paula",
    email: "maddog@thunderdome.net",
    password: "supersecret",
    profileUrl:"https://images.adsttc.com/media/images/5947/7fd4/b22e/383a/5900/0178/newsletter/Malan_Vorster_Treehouse_011_Adam_Letch.jpg?1497857964",
    type: "host",
    location: {street: "4688 W Beliar Pkwy", city: "Santa Fe", state: "NM", zipCode:"83466"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"John and Joe pet adventure",
    email: "sportsfan@gmail.com",
    profileUrl:"https://i.ytimg.com/vi/uZc0tw9C5vk/hqdefault.jpg",
    password: "baseball",
    type: "petOwner",
    location: {street: "482 W Davidson Lane", city: "Columbus", state: "OH", zipCode:"82398"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await.."
  }
];
    let featuresList = feature.map((feature, index) => {
      if (index < 4) {
        return (
          <Carousel.Item style={{height: "450px", backgroundPosition:"center"}}key = {index}>
            <img className="carousel-image" src={ feature.profileUrl} />
            <Carousel.Caption>
              <h3>Plan your next trip to {feature.location.city + ', ' + feature.location.state}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }
    });

    return(
      <Carousel interval={6000}>
        { featuresList }
      </Carousel>
    )
  }
}

module.exports = ListingCarousel;
