import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      linkurl: this.props.linkurl
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Urban Tails</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to={this.state.linkurl}>{this.state.link}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
