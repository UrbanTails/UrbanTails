import React from 'react';
import $ from 'jquery';
import {List, ListItem, Avatar} from 'material-ui';

const style = {
  margin: 12,
};

var ProfileHostBookings = (props) => {
  {console.log(props)}
  if (props.hostBookings.length === 0) {
    return(
      <div>
        <h3 style={style}>Bookings {props.user} is hosting:</h3>
        <div style={style}>No bookings yet.</div>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={style}>Bookings {props.user} is hosting:</h3>
        <List>
        {props.hostBookings.map((booking, index) =>
          <ListItem leftAvatar={<Avatar src={booking.profileUrl}/>}  primaryText={"Hosting " + booking.userName + "!"} secondaryText={"Start Date: " + JSON.stringify(booking.startDate).slice(1, 16) + " / " + "End Date: " + JSON.stringify(booking.enddate).slice(1, 16)}/>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileHostBookings;
