import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import { Row, Col } from 'react-bootstrap';
import { TextField, RaisedButton } from 'material-ui';



const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
  paddingLeft: 15
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
export default class Listing extends React.Component {
  constructor(props) {
    super(props);

    const startDate = new Date();
    const endDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);
    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate.setHours(0, 0, 0, 0);

    this.state = {
      hostName: this.props.location.state.hostName,
      location: this.props.location.state.location,
      description: this.props.location.state.description,
      ownerName: this.props.location.state.username,
      startDate: startDate,
      endDate: endDate,
      style: {backgroundColor: 'white'},
      profileUrl: this.props.location.state.profileUrl
    };
    this.handleChangestartDate = this.handleChangestartDate.bind(this);
    this.handleChangeendDate = this.handleChangeendDate.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
  }

  handleChangestartDate (event, date) {
    this.setState({
      startDate: date,
    });
  };

  handleChangeendDate (event, date) {
    this.setState({
      endDate: date,
    });
  };

  handleBookClick () {
    console.log('owner', this.state.ownerName);
    console.log('host', this.state.hostName);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    $.ajax({
      type: 'POST',
      url: '/book',
      data: {
        ownerName: this.state.ownerName,
        hostName: this.state.hostName,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      },
      success: (res) => {
        console.log(res)
      },
      error: () => {
        console.log('Error!')
      }
    });
  }

  render() {
    return (
      <div>
      <Row className="host-listing" style={this.state.style} >
        <Col md={5}>
          <img style={{ width: '300px', height: '250px'}} className="" src={this.state.profileUrl}/>
        </Col>
        <Col md={5} className="host-content" >
          <h2>{this.state.hostName}</h2>
          <h5>{this.state.location}</h5>
          <p>{this.state.description}</p>
          <div>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
            <i className="material-icons md-24 ratings">pets</i>
          </div>
          <p></p>
        </Col>
      </Row>

      <div style={optionsStyle}>
        <div>
        Choose the dates of your stay:
        </div>
        <div>
          <DatePicker container="inline" mode="landscape"
            onChange={this.handleChangestartDate}
            floatingLabelText="Start Date"
            defaultDate={this.state.startDate}
          />
          <DatePicker container="inline" mode="landscape"
            onChange={this.handleChangeendDate}
            floatingLabelText="End Date"
            defaultDate={this.state.endDate}
          />
        </div>
          My Profile: {this.state.ownerName}
        <div>
        </div>
        
        <div 
          className="btn btn-default btn-lg"
          onClick = {this.handleBookClick}
          >Book Now
        </div>
      </div>
      </div>
    );
  }
}