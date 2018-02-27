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
      objectFit: 'cover',
      objectPosition: '50% 70%'
    }
    let feature1 = this.props.listings[0];
    let feature2 = this.props.listings[1];
    let feature3 = this.props.listings[2];

    return(
      <Carousel interval={6000}>
        <Carousel.Item>
          <img style={imgStyle} src={ feature1.profileUrl} />
          <Carousel.Caption>
            <h3>Plan your next trip to {feature1.location}</h3>
            <p>{feature1.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={imgStyle} src={feature2.profileUrl} />
          <Carousel.Caption>
            <h3>Plan your next trip to {feature2.location}</h3>
            <p>{feature2.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={imgStyle} src={feature3.profileUrl} />
          <Carousel.Caption>
            <h3>Plan your next trip to {feature3.location}</h3>
            <p>{feature3.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}

module.exports = ListingCarousel;
