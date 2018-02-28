import React from 'react';
import Calendar from 'react-calendar';
import Navbar from './navbar.jsx';

class HostProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      imageUrl: this.props.location.state.profileUrl,
      location: this.props.location.state.location,
      description: this.props.location.state.description
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
       <Navbar link="Logout" linkurl="/"/>
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