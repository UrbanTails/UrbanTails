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
    {console.log('nav', this.props.place)}
    return (
      <div>
        <nav className="navbar navbar-light">
          <div className="container-fluid top-nav">
            <div className="navbar-header">
              <Link className="navbar-brand" to={{ pathname: '/', state: this.state.user }}>
                <i className="material-icons">pets</i>Urban Tails
              </Link>
            </div>
            <div className="nav navbar-nav" >{ this.props.place ? <Searchbar setresults={this.state.setresults} place={this.props.place}/> : null }</div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item active"><a href="#">Become a Host</a></li>
                <li className="nav-item active"><a href="#">Help</a></li>
                <li className="nav-item active"><a href="#">About Us</a></li>
                <li className="nav-item active"><Link to={{ pathname: this.state.linkurl, state: this.state.user }}>{this.state.link}</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = Navbar;
