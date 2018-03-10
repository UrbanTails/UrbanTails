import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import { Row, Col } from 'react-bootstrap';
import { TextField, RaisedButton } from 'material-ui';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
  marginBottom: 50
};

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const startDate = new Date();
    const endDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);
    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate.setHours(0, 0, 0, 0);

    this.state = {
      hostName: this.props.hostName,
      location: this.props.location,
      description: this.props.description,
      userName: this.props.userName,
      startDate: startDate,
      endDate: endDate,
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
    $.ajax({
      type: 'POST',
      url: '/book',
      data: {
        location: this.state.location,
        userName: this.state.userName,
        hostName: this.state.hostName,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      },
      success: (res) => {
        console.log('Success!')
      },
      error: () => {
        console.log('Error!')
      }
    });
  }

  render() {
    return (
      <div className = "calendar">

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

          <div>
            Currently logged in as: {this.state.userName}
          </div>

          <div
            className="btn btn-default btn-lg"
            onClick = {this.handleBookClick}>
            Book Now
          </div>

        </div>

      </div>
    );
  }
}