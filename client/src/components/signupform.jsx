import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import Navbar from './navbar.jsx';
import { Card, DropDownMenu, MenuItem, TextField, RadioButton, RadioButtonGroup, RaisedButton } from 'material-ui';

const styles = {
  customWidth: {
    width: 200,
  },
};

/*
  SignupForm Component:
  Used by signup component.
  Validates all fields (server side).
  On submit, user data is posted to database.
  Redirects to appropriate user profile and passes all user data to profile.
*/

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      password: this.props.location.state.password,
      type: 'petOwner',
      email: '',
      price: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      profileUrl: '',
      description: '',
      errors: {},
      redirectToProfile: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let clearedState = {};
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {
        username: this.state.username,
        password: this.state.password,
        type: this.state.type,
        email: this.state.email,
        price: this.state.price,
        location: { street: this.state.street, city: this.state.city, state: this.state.state, zipCode: this.state.zipCode },
        profileUrl: this.state.profileUrl,
        description: this.state.description
      },
      success: (data) => {
        this.setState({
          redirectToProfile: true,
          user: data,
        });
      },
      error: (data) => {
        this.setState({
          errors: data.responseJSON.errors
        });
      }
    });

    this.setState(clearedState);
  }

  handleChange(e) {
    const target = e.target.name;
    this.setState({
      [ target ]: e.target.value
    });
  }

  onSelect(e) {
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    });
  }

  render () {
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile) {
      if (this.state.type === 'host') {
        return(<Redirect to={{ pathname: '/host-profile', state: this.state }}/>)
      } else {
        return (<Redirect to={{ pathname: '/login'}}/>)
      }
    }

    return (
      <div>
        <Navbar link="Login" linkurl="/login"/>
        <Card className="container signupform">
          <form action="/" onSubmit={this.handleSubmit.bind(this)} >
            <h2>Create Your Profile</h2>
            <div className="field-line">
              <TextField floatingLabelText="Username" name="username" onChange={this.handleChange} value={this.state.username} errorText={ this.state.errors.username}/>
            </div>
            <div className="field-line">
                <TextField floatingLabelText="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} errorText={ this.state.errors.password} />
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Email" name="email" onChange={this.handleChange} value={this.state.email} errorText={ this.state.errors.email }/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Asking Price:" name="price" onChange={this.handleChange} value={this.state.price} errorText={ this.state.errors.email }/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Street" name="street" onChange={this.handleChange} value={this.state.street} errorText={ this.state.errors.location}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="City" name="city" onChange={this.handleChange} value={this.state.city} errorText={ this.state.errors.location}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="State" name="state" onChange={this.handleChange} value={this.state.state} errorText={ this.state.errors.location}/>
            </div>
            {/*<div>
              <DropDownMenu style={styles} value={this.state.state} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="AL" />
                <MenuItem value={2} primaryText="AK" />
                <MenuItem value={3} primaryText="AZ" />
                <MenuItem value={4} primaryText="AR" />
                <MenuItem value={5} primaryText="CA" />
                <MenuItem value={5} primaryText="CO" />
                <MenuItem value={5} primaryText="CT" />
                <MenuItem value={5} primaryText="DE" />
                <MenuItem value={5} primaryText="FL" />
                <MenuItem value={5} primaryText="GA" />
                <MenuItem value={5} primaryText="HI" />
                <MenuItem value={5} primaryText="ID" />
                <MenuItem value={5} primaryText="IL" />
                <MenuItem value={5} primaryText="IN" />
                <MenuItem value={5} primaryText="IA" />
                <MenuItem value={5} primaryText="KS" />
                <MenuItem value={5} primaryText="KY" />
                <MenuItem value={5} primaryText="LA" />
                <MenuItem value={5} primaryText="ME" />
                <MenuItem value={5} primaryText="MD" />
                <MenuItem value={5} primaryText="MA" />
                <MenuItem value={5} primaryText="MI" />
                <MenuItem value={5} primaryText="MN" />
                <MenuItem value={5} primaryText="MS" />
                <MenuItem value={5} primaryText="MO" />
                <MenuItem value={5} primaryText="MT" />
                <MenuItem value={5} primaryText="NE" />
                <MenuItem value={5} primaryText="NV" />
                <MenuItem value={5} primaryText="NH" />
                <MenuItem value={5} primaryText="NJ" />
                <MenuItem value={5} primaryText="NM" />
                <MenuItem value={5} primaryText="NY" />
                <MenuItem value={5} primaryText="NC" />
                <MenuItem value={5} primaryText="ND" />
                <MenuItem value={5} primaryText="OH" />
                <MenuItem value={5} primaryText="OK" />
                <MenuItem value={5} primaryText="OR" />
                <MenuItem value={5} primaryText="PA" />
                <MenuItem value={5} primaryText="RI" />
                <MenuItem value={5} primaryText="SC" />
                <MenuItem value={5} primaryText="SD" />
                <MenuItem value={5} primaryText="TN" />
                <MenuItem value={5} primaryText="TX" />
                <MenuItem value={5} primaryText="UT" />
                <MenuItem value={5} primaryText="VT" />
                <MenuItem value={5} primaryText="VA" />
                <MenuItem value={5} primaryText="WA" />
                <MenuItem value={5} primaryText="WV" />
                <MenuItem value={5} primaryText="WI" />
                <MenuItem value={5} primaryText="WY" />
              </DropDownMenu>
            </div> */}
            <div className="field-line">
              <TextField floatingLabelText="Zip Code" name="zipCode" onChange={this.handleChange} value={this.state.zipCode} errorText={ this.state.errors.location}/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="ImageUrl" name="profileUrl" onChange={this.handleChange} value={this.state.profileUrl} errorText={ this.state.errors.profileUrl }/>
            </div>
            <div className="field-line">
              <TextField name="description" hintText="Describe yourself or your home to others" multiLine={true} rows={1} rowsMax={4} fullWidth={true} onChange={this.handleChange} value={this.state.description} errorText={ this.state.errors.description }/>
            </div>
            <RaisedButton type="submit" label="Submit" primary={true} fullWidth={true} />
          </form>
        </Card>
      </div>
    )
  }
}

module.exports = SignupForm;