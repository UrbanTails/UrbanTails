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
      errors: {},
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
      displayEmailInput: false,
      page: 'View'
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
    this.onUpdateProfileClick = this.onUpdateProfileClick.bind(this);
    this.onViewProfileClick = this.onViewProfileClick.bind(this);
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

  onUpdateProfileClick() {
    this.setState({
      page: 'Update'
    });
  }

  onViewProfileClick() {
    this.setState({
      page : 'View'
    });
  }

  updateProfile(e) {
    $.ajax({
      type: 'POST',
      url: '/update-profile',
      data: {
        username: this.state.username,
        imageUrl: this.state.newImageUrl,
        location: this.state.newLocation,
        description: this.state.newDescription,
        email: this.state.newEmail
      },
      success: (userData) => {
        if (userData.errors) {
          this.setState({
            errors: userData.errors
          });
        } else {
          this.setState({
            imageUrl: userData.profileUrl,
            location: userData.location,
            description: userData.description,
            email: userData.email,
            page: 'View'
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    if (this.state.page === "View") {
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
              <button onClick={this.onUpdateProfileClick} className='btn btn-default btn-lg'>
                Update Profile
              </button>
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
              </div><br/>
              <div className='row'>
                <div style={{ paddingLeft: '10%' }} className='col-md-4' className="host-content">
                </div>
              </div>
            </div>
          )
    } else if (this.state.page === 'Update') {
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
          <button onClick={this.onViewProfileClick} className='btn btn-default btn-lg'>
            View Profile
          </button>
          <div className='row'>
            <div style={{ paddingLeft: '10%' }} className='col-md-5'>
              <h3>{this.state.username}</h3>
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: '300px', margin: '15px'}}>
            <div style={{ margin: '15px' }}>
              <label>Email address</label>
              <input style={style} className="form-control" value={this.state.newEmail} onChange={this.onEmailEntry} type="text" placeholder="name@example.com"/>
            </div>
            <div style={{ margin: '15px' }}>
              <label style={{ margin: '5px' }}>Address</label>
              <label style={{ margin: '5px' }}>Street Address</label>
              <input style={style} className="form-control" value={this.state.newLocation} onChange={this.onLocationEntry} type="text"/>
            </div>
            <div>
              <label style={{ margin: '5px' }}>City</label>
              <input style={style} className="form-control" value={this.state.newLocation} onChange={this.onLocationEntry} type="text"/>
              <label style={{ margin: '5px' }}>State</label>
              <select multiple class="form-control">
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
              </select>
            </div>
            <div style={{ margin: '15px' }}>
              <label>Description</label>
              <input style={style} className="form-control" value={this.state.newDescription} onChange={this.onDescriptionEntry} type="text"/>
            </div>
            <div style={{ margin: '15px' }}>
              <label>Image Url</label>
              <input style={style} className="form-control" value={this.state.newImageUrl} onChange={this.onImageEntry} type="text"/>
            </div>
              <button style={{ marginLeft: '82px', marginTop: '10px' }} className="btn btn-default btn-lg" onClick={this.updateProfile} >
                Update Profile
              </button>
          </div>
        </div>
      )
    }
  }
}

module.exports = HostProfile;