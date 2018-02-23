import React from 'react';
import Calendar from 'react-calendar';

class HostProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Charlie',
      imageUrl: 'https://i.imgur.com/BSBVtHJ.jpg',
      location: 'Los Angeles',
      description: 'Comfortable 2 bedroom apartment with pet bedroom. Amenities include: leashes, food & water bowls, poop bags and toys.  Big bay window for pets to enjoy the view.'
    };
  }

  render () {
    const calendarStyle = {
      width: "350px"
    }
    const imageStyle = {
      width: "150px",
      height: "150px",
      objectFit: "cover",
      borderRadius: "50%"
    }
    return (
      <div>
        <img src={this.state.imageUrl} style = { imageStyle } />
        <p>{this.state.username}</p>
        <p>Location: {this.state.location}</p>
        <p>Description: {this.state.description}</p>
        <div style={ calendarStyle }>
          <Calendar className="react-calendar" />
        </div>
      </div>
    )
  }
}


module.exports = HostProfile;