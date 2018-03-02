import React from 'react';
import { Carousel, Item, Caption } from 'react-bootstrap';

class ListingCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const imgStyle = {
      minWidth: '100%',
      maxHeight:'600px',
      minHeight:'550px',
      objectFit: 'cover',
      objectPosition: '50% 70%'
    }
    let feature = this.props.listings;

    let featuresList = feature.map((feature, index) => {
      if (index < 3) {
        return (
          <Carousel.Item key = {index}>
            <img style={imgStyle} src={ feature.profileUrl} />
            <Carousel.Caption>
              <h3>Plan your next trip to {feature.location}</h3>
              <p>{feature.description}</p>
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
