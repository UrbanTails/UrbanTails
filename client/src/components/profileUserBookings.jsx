import React from 'react';
import $ from 'jquery';
import {List, ListItem, Avatar} from 'material-ui';

const style = {
  margin: 12,
};

var ProfileUserBookings = (props) => {
  {console.log(props)}
  if (props.userBookings.length === 0) {
    return(
      <div>
        <h3 style={style}>{"Bookings for " + props.user + "'s pet:"}:</h3>
        <div style={style}>No bookings yet.</div>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={style}>{"Bookings for " + props.user + "'s pet:"}:</h3>
        <List>
        {props.userBookings.map((booking, index) =>
          <ListItem primaryText={"Booking for " + booking.userName} secondaryText={"Start Date: " + booking.startDate + " / " + "End Date: " + booking.enddate}/>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileUserBookings;
