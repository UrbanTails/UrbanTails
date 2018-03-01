import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './searchbar.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      linkurl: this.props.linkurl,
      user: this.props.user
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
            { this.props.search ? <Searchbar/> : null }
            <ul className="nav navbar-nav navbar-right">
              <li><Link to={{ pathname: this.state.linkurl, state: this.state.user }}>{this.state.link}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
