import React from 'react';
import Calendar from 'react-calendar';
import Navbar from './navbar.jsx';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { RaisedButton } from 'material-ui';

/*
  HostProfile Component:
  Used after logging in or signing up as a host, it displays all the information about the host.
  Currently this is a private profile, but it can potentially be public, have more functions
  such as ratings and messaging, and can be shown by clicking on an individual listing on the listings page.
*/

const style = {
  margin: 12,
};

class HostProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      imageUrl: this.props.location.state.profileUrl,
      location: this.props.location.state.location,
      description: this.props.location.state.description,
      email: this.props.location.state.email,
      newImageUrl: '',
      newLocation: '',
      newDescription: '',
      newEmail: '',
      displayImageButton: true,
      displayLocationButton: true,
      displayDescriptionButton: true,
      displayEmailButton: true,
      displayImageInput: false,
      displayLocationInput: false,
      displayDescriptionInput: false,
      displayEmailInput: false
    };

    this.onImageEntry = this.onImageEntry.bind(this);
    this.onLocationEntry = this.onLocationEntry.bind(this);
    this.onDescriptionEntry = this.onDescriptionEntry.bind(this);
    this.onEmailEntry = this.onEmailEntry.bind(this);
    this.revealImageInput = this.revealImageInput.bind(this);
    this.revealLocationInput = this.revealLocationInput.bind(this);
    this.revealDescriptionInput = this.revealDescriptionInput.bind(this);
    this.revealEmailInput = this.revealEmailInput.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  onImageEntry(e) {
    this.setState({
      newImageUrl: e.target.value
    });
  }

  onLocationEntry(e) {
    this.setState({
      newLocation: e.target.value
    });
  }

  onDescriptionEntry(e) {
    this.setState({
      newDescription: e.target.value
    });
  }

  onEmailEntry(e) {
    this.setState({
      newEmail: e.target.value
    });
  }

  revealImageInput() {
    this.setState({
      displayImageButton: false,
      displayImageInput: true
    });
  }

  revealLocationInput() {
    this.setState({
      displayLocationButton: false,
      displayLocationInput: true
    });
  }


  revealDescriptionInput() {
    this.setState({
      displayDescriptionButton: false,
      displayDescriptionInput: true
    });
  }

  revealEmailInput() {
    this.setState({
      displayEmailButton: false,
      displayEmailInput: true
    });
  }

  updateProfile(e) {
    e.preventDefault();
    var component = this;
    $.ajax({
      type: 'POST',
      url: '/update-profile',
      data: {
        username: component.state.username,
        imageUrl: component.state.newImageUrl,
        location: component.state.newLocation,
        description: component.state.newDescription,
        email: component.state.newEmail
      },
      success: (data) => {
        console.log('Profile updated!');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (
      <div>
        <Navbar link="Logout" linkurl="/" />
        <Link
          className="btn btn-default btn-lg"
          to={{
          pathname: '/listing',
          state: { username: this.state.username}
          }}>
        Listing
        </Link>
        <div className="well"></div>
        <div className='row'>
          <div style={{ paddingLeft: '10%' }} className='col-md-4'>
            <div className="profileimg"><img src={this.state.imageUrl} /></div>
          </div>
          <div style={{ paddingLeft: '10%' }} className='col-md-5'>
            <h3>{this.state.username}</h3>
            <p>
              <b>Host Rating:</b>
              <i className="material-icons md-24 ratings">pets</i>
              <i className="material-icons md-24 ratings">pets</i>
              <i className="material-icons md-24 ratings">pets</i>
              <i className="material-icons md-24 ratings">pets</i>
              <i className="material-icons md-24 ratings">pets</i>
            </p>
            <p><b>Email: </b>{this.state.email}</p>
            <p><b>Location: </b>{this.state.location}</p>
            <p><b>Description: </b></p>
            <p className="description">{this.state.description}</p>
          </div>
          <div>
            {this.state.displayEmailButton && <RaisedButton label="Update E-mail" style={style} onClick={this.revealEmailInput} />}
            {this.state.displayEmailInput && <input style={style} value={this.state.newEmail} onChange={this.onEmailEntry} type="text"/>}

            {this.state.displayLocationButton && <RaisedButton label="Update Address" style={style} onClick={this.revealLocationInput} />}
            {this.state.displayLocationInput && <input style={style} value={this.state.newLocation} onChange={this.onLocationEntry} type="text"/>}

            {this.state.displayDescriptionButton && <RaisedButton label="Update Description" style={style} onClick={this.revealDescriptionInput} />}
            {this.state.displayDescriptionInput && <input style={style} value={this.state.newDescription} onChange={this.onDescriptionEntry} type="text"/>}
          </div>
        </div><br/>
        <div className='row'>
          <div style={{ paddingLeft: '10%' }} className='col-md-4' className="host-content">
            <div style= {{ maxWidth: '300px' }}>
              {this.state.displayImageButton && <RaisedButton label="Update Image" onClick={this.revealImageInput}/>}
              {this.state.displayImageInput && <input style={style} value={this.state.newImageUrl} onChange={this.onImageEntry} type="text"/>}
            </div>
          <button style={style} className="ui button" onClick={this.updateProfile} >
            Update Profile
          </button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = HostProfile;