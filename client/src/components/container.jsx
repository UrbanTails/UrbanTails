import React from 'react';
import {render} from 'react-dom';
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './map.jsx';

class Container extends React.Component{

  render(){
    {console.log('container props', this.props)}
    return (
      <div>
        <Map 
          google={this.props.google}
          address={this.props.address}
        />

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFDryTk4Mhy8m7qNPaxkXpS2ASY_4ImuA'
})(Container);
