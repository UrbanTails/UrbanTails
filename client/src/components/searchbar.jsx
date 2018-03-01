import React from 'react';
import $ from 'jquery';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/listings',
      data: {
        query: this.state.query
      },
      success: (data) => {
        console.log('ajax posting data', data);
      },
      error: (data) => {
        console.log('error posting data', data);
      }
    });

    this.setState({
      query: ''
    });
  }


  render() {
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
      </div>
    )
  }
}

module.exports = Searchbar;
