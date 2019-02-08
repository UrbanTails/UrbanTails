import React from 'react';
import { Carousel, Item, Caption } from 'react-bootstrap';

/*
  ListingCarousel Component:
  Used on listings page
  Shows top 3 listings, or less, given an array of listings from the listings page state
*/

export default class ListingCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let feature = this.props.listings;
    let featuresList = feature.map((feature, index) => {
      if (index < 3) {
        return (
          <Carousel.Item key = {index}>
            <img className="carousel-image" src={ feature.profileUrl} />
            <Carousel.Caption>
              <h3>Plan your next trip to {feature.location}</h3>
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

