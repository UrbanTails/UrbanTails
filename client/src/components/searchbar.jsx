import React from 'react';
import $ from 'jquery';

/*
  Searchbar Component:
  Used by Listings component
  Sends query to database based on input (currently limited)
  Shows error message if query does not match 'New York' or 'Los Angeles'
  Results are rendered to page
*/

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      error: ''
    }
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  toggleError(text) {
    this.setState({
      error: text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.query) {
      this.toggleError('');
      $.ajax({
        type: 'GET',
        url: `/getlistings?city=${this.state.query}`,
        success: (data) => {
          console.log('ajax posting data', data);
          this.props.setresults(data);
        },
        error: (data) => {
          console.log('error posting data', data);
        }
      });
    } else {
      this.toggleError('Please enter a city name');
    }

    this.setState({
      query: ''
    });
  }


  render() {
    let show = this.state.error ? { display: 'block', color: 'red' } : { display: 'none' };
    return (

      <div className="col-sm-8 searchbar">
        <form className="navbar-form navbar-left" role="search" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input style={{ width: '400px',height:'55px' }} type="text" className="form-control" placeholder="Try Greg's cat haven" name="srch-term" id="srch-term" value={this.state.query} onChange={this.handleChange.bind(this)}/>
            <div className="input-group-btn">
              <button style={{ width: '59px',height:'55px' }}className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
            </div>
          </div>
        </form>
        <small style={ show }>{ this.state.error }</small>
      </div>
    )
  }
}

module.exports = Searchbar;
