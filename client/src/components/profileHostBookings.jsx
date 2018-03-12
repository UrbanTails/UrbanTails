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
        <h3 style={style}>Dates you are hosting:</h3>
        <List>
        {props.hostBookings.map((booking, index) =>
          <div>
            <ListItem leftAvatar={<Avatar src={booking.profileUrl}/>}  primaryText={"Hosting " + booking.userName + "!"} secondaryText={"Check In: " + JSON.stringify(booking.startDate).slice(1, 16) + " / " + "Check Out: " + JSON.stringify(booking.enddate).slice(1, 16)}/>
              {booking.approved === true ? 
                (<div>
                  <span style={{marginLeft: '72px', color: 'green', marginRight: '10px'}}>Approved!</span>
                  <button className='btn btn-default btn-lg'>
                  Cancel
                  </button>
                </div>)
                :

                (<button style={{marginLeft: '72px'}} className='btn btn-default btn-lg' onClick={() => props.approveBooking(booking)}>
                Approve
                </button>) 
              }
          </div>
        )}
        </List>
      </div>

    )
  }
}

module.exports = ProfileHostBookings;
