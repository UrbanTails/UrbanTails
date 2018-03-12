import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import { Row, Col } from 'react-bootstrap';
import { TextField, RaisedButton } from 'material-ui';
import Checkout from './checkout.jsx';


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

    this.state = {
      hostName: this.props.hostName,
      location: this.props.location,
      description: this.props.description,
      userName: this.props.userName,
      startDate: startDate,
      endDate: endDate,
      available: false,
      buttonText: "Check Availability",
      price: this.props.price,
      profileUrl: this.props.profileUrl
    };
    this.handleChangestartDate = this.handleChangestartDate.bind(this);
    this.handleChangeendDate = this.handleChangeendDate.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
  }

  handleChangestartDate (event, date) {
    this.setState({
      startDate: date,
      available: false
    });
  };

  handleChangeendDate (event, date) {
    console.dir(JSON.stringify(date));
    this.setState({
      endDate: date,
      available: false
    });
  };

  handleBookClick () {
    var component = this;
    $.ajax({
      type: 'POST',
      url: '/book',
      data: {
        location: this.state.location,
        userName: this.state.userName,
        hostName: this.state.hostName,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        price: this.state.price,
        profileUrl: this.state.profileUrl
      },
      success: (res) => {
        console.log('Success!')
        component.setState({
          available: true,
        });
      },
      error: () => {
        console.log('Error!')
      }
    });
  }

  render() {
    var startDateString = JSON.stringify(this.state.startDate)
    startDateString = startDateString.slice(0, startDateString.indexOf("T"));
    var endDateString = JSON.stringify(this.state.endDate)
    endDateString = endDateString.slice(0, endDateString.indexOf("T"));
    var startDate = Date.parse(startDateString);
    var endDate = Date.parse(endDateString);
    var timeDiff = endDate - startDate;
    var numNights = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    var total = numNights * this.state.price;

    return (
      <div className = "calendar">

      <div style={optionsStyle}>
        <h4>{this.state.hostName}</h4>
        <span>Contact: {this.props.email}</span>

        <h4>${this.state.price} per night</h4>
        <h5>${this.state.price} x {numNights} nights = ${total}</h5>

          <div>
            <DatePicker
              style={{calendarYearBackgroundColor: 'black'}}
              container="inline" mode="landscape" textFieldStyle={{width: '100%'}}
              onChange={this.handleChangestartDate}
              floatingLabelText="Check In"
              defaultDate={this.state.startDate}
            />
            <DatePicker container="inline" mode="landscape"
              onChange={this.handleChangeendDate}
              floatingLabelText="Check Out"
              defaultDate={this.state.endDate}
            />
          </div>

          <div>

            {this.state.available ? (
              <div>
                <div
                  style = {{color: "#008080", marginBottom: '5px', fontSize: 20}}>
                  <span>Available</span> <span class="glyphicon glyphicon-ok"></span>
                </div>
                <div>
                  <Checkout
                    classname= "checkout"
                    name={'Your Freedom Awaits'}
                    amount={total}
                  />
                </div>
              </div>) : (

              <div
                style= {{backgroundColor: "#008080", color: "white", marginBottom: '5px'}}
                className="btn btn-default btn-lg"
                onClick = {this.handleBookClick}>
                {this.state.buttonText}
              </div>
              )}

          </div>

        </div>

      </div>
    );
  }
}
