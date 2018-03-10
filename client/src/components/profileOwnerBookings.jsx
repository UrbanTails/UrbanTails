import React from 'react';
import $ from 'jquery';
import {List, ListItem} from 'material-ui';

const style = {
  margin: 12,
};

var ProfileOwnerBookings = (props) => {
  if (props.ownerBookings.length === 0) {
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
        {props.ownerBookings.map((booking, index) =>
          <ListItem primaryText={"Booking" + index} style={style}/>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileOwnerBookings;
