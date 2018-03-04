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
      description: this.props.location.state.description,
      email: this.props.location.state.email
    };
  }

  render () {
    return (
      <div>
        <Navbar link="Logout" linkurl="/" />
        <div className="well"></div>
        <div className='row'>
          <div style={{ paddingLeft: '10%' }} className='col-md-4'>
            <div className="profileimg"><img src={this.state.imageUrl} /></div>
          </div>
          <div style={{ paddingLeft: '10%' }} className='col-md-5'>
            <h3>{this.state.username}</h3>
            <p><b>Email:</b> {this.state.email}</p>
            <p><b>Location:</b> {this.state.location}</p>
            <p><b>Description:</b></p>
            <p className="description">{this.state.description}</p>
          </div>
        </div><br/>
        <div className='row'>
          <div style={{ paddingLeft: '10%' }} className='col-md-4' className="host-content">
            <div style= {{ maxWidth: '300px' }}>
              <Calendar className="react-calendar" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = HostProfile;