import React from 'react';
import { Link } from 'react-router-dom';
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
    const style = {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
    }
    const margin = {
      margin: 'auto'
    }
    return (
      <div>
        <Navbar link="Logout" linkurl="/"/>
        <div className="row">
          <div style={{ paddingLeft: '10%' }} className="col-sm-4">
            <img style={style} src={this.state.profileUrl} />
            <h3>{this.state.username}</h3>
            <p>Location: {this.state.location}</p>
          </div>
          <div style={{ margin: '30px auto' }} className="col-sm-8">
            {this.state.description}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = PetProfile;
