import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loc: 'hey'
    }
  }
  componentDidMount(){
    var parsedAddress = this.props.address.split(' ').join('+')
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=AIzaSyBoHnvNEFxjZ-EyIDQ-cKRYpnDD4y0GEmQ`)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=AIzaSyBoHnvNEFxjZ-EyIDQ-cKRYpnDD4y0GEmQ`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('geocode result', result);
          this.setState({
            loc: {
              lat: result.results[0].geometry.location.lat,
              lng: result.results[0].geometry.location.lng
            }
          });
          this.loadMap();
          this.forceUpdate();
        },

        (error) => {
          console.log("That address is'nt real")
        }
      )

  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.google !== this.props.google){
      console.log('updating props');
      this.loadMap();
    }
  }

  loadMap(){
    if(this.props && this.props.google){
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom =13;
      let lat = this.state.loc.lat;
      let lng = this.state.loc.lng;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      console.log(this.map);
      const marker = new google.maps.Marker({
        position: {lat: this.state.loc.lat, lng: this.state.loc.lng},
        map: this.map,
        title: 'home'
      })
    }
  }

  render(){
    const style = {
      width: '40vw',
      height: '40vh'
    };
    return (
      <div style = {style}ref="map">map will come here</div>
    );
  }
}

export default Map;
