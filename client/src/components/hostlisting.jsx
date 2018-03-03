import React from 'react';

class HostListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{padding: '1px'}}>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-3">
          <img style={{ width: '300px', height: '300px'}} className="" src={this.props.host.profileUrl}/>
        </div>
        <div className="col-md-7">
            <h2>{this.props.host.username}</h2>
            <h5>{this.props.host.location}</h5>
            <p>{this.props.host.description}</p>
        </div>
      </div>
      </div>
    )
  }
}

module.exports = HostListing;