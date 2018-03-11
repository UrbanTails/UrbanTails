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
        <h3 style={style}>{"Bookings for " + props.user + "'s pet:"}</h3>
        <div style={style}>No bookings yet.</div>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={style}>{"Bookings for " + props.user + "'s pet:"}</h3>
        <List>
        {props.userBookings.map((booking, index) =>
          <ListItem leftAvatar={<Avatar src={booking.profileUrl}/>} primaryText={"Booked with " + booking.hostName + "!"} secondaryText={"Start Date: " + JSON.stringify(booking.startDate).slice(1, 16) + " / " + "End Date: " + JSON.stringify(booking.enddate).slice(1, 16)}/>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileUserBookings;
