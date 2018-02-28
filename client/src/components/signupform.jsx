import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import Navbar from './navbar.jsx';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.user.username,
      type: 'host',
      email: '',
      image: '',
      description: '',
      redirectToProfile: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.state;

    $.ajax({
      type: 'PUT',
      url: '/signup',
      data: {
        username: this.state.username,
        type: this.state.type,
        email: this.state.email,
        image: this.state.image,
        description: this.state.description
      },
      success: (data) => {
        console.log('ajax posting data', data);
        this.setState({
          redirectToProfile: true,
          user: data,
        });
      },
      error: (data) => {
        console.log('error posting data', data);
      }
    });
  }

  handleChange(e) {
    const target = e.target.id;
    this.setState({
      [ target ]: e.target.value
    })
  }

  onSelect(e) {
    this.setState({
      type: e.target.value
    });
  }

  render () {
    if (this.state.redirectToProfile) {
      return <Redirect to={{ pathname: '/login', state: this.state }} />
    }
    return (
      <div>
        <Navbar link="Login" linkurl="/login"/>
        <div className="container lend-cat">
          <h1>Create Your Profile</h1>
          <form className="form-box" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <div className="radio">
                <label>
                  <input type="radio" value="host" onChange={this.onSelect} checked={this.state.type === "host"}/>
                  Host
                </label>
                <label>
                  <input type="radio" value="petOwner" onChange={this.onSelect} checked={this.state.type === "petOwner"}/>
                  Pet Owner
                </label>
              </div>
              <label for="username">Username:</label>
              <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleChange}/>
              <label for="email">Email:</label>
              <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange}/>
              <label for="image">Image URL:</label>
              <input type="text" className="form-control" id="image" value={this.state.image} onChange={this.handleChange}/>
              <label for="description">Description:</label>
              <textarea className="form-control" id="description" rows="3" value={this.state.description} onChange={this.handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary add-cat-button">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

module.exports = SignupForm;