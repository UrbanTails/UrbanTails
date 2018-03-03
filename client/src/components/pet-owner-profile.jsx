import React from 'react';
import Navbar from './navbar.jsx';

class PetProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.location.state.username,
      profileUrl: this.props.location.state.profileUrl,
      description: this.props.location.state.description,
      location: this.props.location.state.location
    }
  }
  
  render() {
    return (
      <div>
        <Navbar link="Logout" linkurl="/" />
        <div className="well"></div>
          <div style={{ paddingLeft: '10%' }} className="col-md-4">
            <img className="profileimg" src={this.state.profileUrl} />
            <h3>{this.state.username}</h3>
            <p><b>Location:</b> {this.state.location}</p>
          </div>
          <div style={{ margin: '30px auto' }} className="col-md-7">
            <b>Description:</b> {this.state.description}
          </div>
      </div>
    )
  }
}

module.exports = PetProfile;
