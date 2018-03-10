import React from 'react';
import $ from 'jquery';
import {List, ListItem} from 'material-ui';

const style = {
  margin: 12,
};

var ProfileHostBookings = (props) => {
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
        {props.ownerBookings.map((booking, index) =>
          <ListItem leftAvatar={<Avatar src={booking.profileUrl}/>} primaryText={"Booking for" + booking.userName} secondaryText={"Start Date: " + booking.startDate + " / " + "End Date: " + booking.endDate}/>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileHostBookings;
