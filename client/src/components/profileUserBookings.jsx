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
        <h3 style={style}>{"Bookings for your pet:"}</h3>
        <div style={style}>No bookings yet.</div>
      </div>
    );
  } else {
    return (
      <div style={{marginBottom: '30px'}}>
        <h3 style={style}>{"Bookings for your pet:"}</h3>
        <List>
        {props.userBookings.map((booking, index) =>
          <div>
            {console.log('booking', booking)}
            <ListItem leftAvatar={<Avatar src={booking.profileUrl}/>} primaryText={"Booked with " + booking.hostName + "!"} secondaryText={"Check In: " + JSON.stringify(booking.startDate).slice(1, 16) + " / " + "Check Out: " + JSON.stringify(booking.enddate).slice(1, 16)} /> 
            {booking.approved === true ?
              (<div style={{marginLeft: '72px', color: 'green'}}>
              Approved!
              </div> )

               : 

              (<div style={{marginLeft: '72px', color: 'red'}}>
              Pending Approval
              </div> )
      
            }
          </div>
        )}
        </List>
      </div>
    )
  }
}

module.exports = ProfileUserBookings;
