import React from 'react';

/*
  Footer Component:
  Used on landing page, login page, and signup page
*/

const Footer = (size) => {
    return (
      <div className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <p className="navbar-text pull-left">© 2018 - Site Built by Sorrel Labs
          </p>
          <a href="http://www.urbantails.info" className="navbar-btn btn-danger btn pull-right">
          <span className="glyphicon glyphicon-star"></span>  Urban Tails 2018</a>
          <a href="https://www.facebook.com/urbantails123"><img src="http://www.hayfordmarketing.com/uploads/1/3/6/6/13660621/untitled-design-1_13_orig.png"  style={{height:"45px", width:"190px"}}/></a>
        </div>
      </div>
    )
}

export default Footer;






