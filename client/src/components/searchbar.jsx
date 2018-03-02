import React from 'react';
import $ from 'jquery';

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
    if (this.state.query === 'Los Angeles' || this.state.query === 'New York') {
      this.toggleError('');
      $.ajax({
        type: 'POST',
        url: '/getlistings',
        data: {
          query: this.state.query
        },
        success: (data) => {
          console.log('ajax posting data', data);
          this.props.setresults(data);
        },
        error: (data) => {
          console.log('error posting data', data);
        }
      });
    } else {
      this.toggleError('Search only available for "Los Angeles" and "New York" locations');
    }

    this.setState({
      query: ''
    });
  }


  render() {
    let show = this.state.error ? { display: 'block', color: 'red' } : { display: 'none' };
    return (
      <div className="col-sm-10 searchbar">
        <form className="navbar-form" role="search" onSubmit={this.handleSubmit.bind(this)}>
        <div className="input-group">
          <input style={{ width: '225px' }} type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" value={this.state.query} onChange={this.handleChange.bind(this)}/>
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
          </div>
        </div>
        </form>
        <small style={ show }>{ this.state.error }</small>
      </div>
    )
  }
}

module.exports = Searchbar;
