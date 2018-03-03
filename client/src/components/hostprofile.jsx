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
    return (
      <div>
        <Navbar link="Logout" linkurl="/"/>
        <div className="well"></div>
          <div style={{ paddingLeft: '10%' }} className="col-md-4">
            <img className="profileimg" src={this.state.imageUrl} />
            <h3>{this.state.username}</h3>
            <p><b>Location:</b> {this.state.location}</p>
            <div style= {{ maxWidth: '300px' }}>
              <Calendar className="react-calendar" />
            </div>
          </div>
          <div style={{ margin: '30px auto' }} className="col-md-7">
            <b>Description:</b> {this.state.description}
          </div>
      </div>
    )
  }
}

module.exports = HostProfile;