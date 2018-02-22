import React from 'react';
import ReactDOM from 'react-dom';

class Signup extends React.Component {
    render () {
        return (
          <div>
            <nav>Urban Tails</nav>
            <img src='http://www.freepngimg.com/download/dog/15-dog-png-image-picture-download-dogs.png'/>
            <form>
                <input className='username'></input>
                <input className='password'></input>
                <submit className='submit'>Sign Up</submit>
            </form>
          </div>
        )
      }
    }
module.exports = Signup;