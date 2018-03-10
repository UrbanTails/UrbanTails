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
      available: false,
      buttonText: "Check Availability"
    };
    this.handleChangestartDate = this.handleChangestartDate.bind(this);
    this.handleChangeendDate = this.handleChangeendDate.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
  }

  handleChangestartDate (event, date) {
    this.setState({
      startDate: date
    });
  };

  handleChangeendDate (event, date) {
    this.setState({
      endDate: date
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
        endDate: this.state.endDate
      },
      success: (res) => {
        console.log('Success!')
        component.setState({
          available: true
        });
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

        <h4>$64 per night</h4>

          <div>
            <DatePicker container="inline" mode="landscape" textFieldStyle={{width: '100%'}}
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
            {this.state.available ? (<Checkout/>) : (
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