import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component{

  componentDidMount(){
    this.loadMap();
    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.google !== this.props.google){
      console.log('updating props');
      this.loadMap();
    }
  }

  loadMap(){
    console.log(this.props)
    if(this.props && this.props.google){
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom =13;
      let lat = 37.783684;
      let lng = -122.408986;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      console.log(this.map);
      const marker = new google.maps.Marker({
        position: {lat: 37.783684, lng: -122.408986},
        map: this.map,
        title: 'home'
      })
    }
  }

  render(){
    const style = {
      width: '50vw',
      height: '50vh'
    };
    return (
      <div style = {style}ref="map">map will come here</div>
    );
  }
}

export default Map;
