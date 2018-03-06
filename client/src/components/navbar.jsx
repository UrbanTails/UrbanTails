import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './searchbar.jsx';

/*
  Navbar Component:
  Rendered on every page
  Displays a link (via props) based on which page it's rendered on.
  Displays search bar if property is set to true on the page that renders the navbar.
  Clicking brand links to landing page.
*/

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      linkurl: this.props.linkurl,
      user: this.props.user,
      setresults: this.props.setresults
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <div className="container-fluid top-nav">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <i className="material-icons">pets</i>Urban Tails
              </a>
            </div>
            { this.props.search ? <Searchbar setresults={this.state.setresults}/> : null }
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
