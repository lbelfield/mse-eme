import React, {Component} from 'react';

import Form from './form';
import globe from '../assets/globe.mp4';

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  handleClick() {
    this.setState(() => {
      return {
        value: 'Button Clicked',
      };
    });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value,
      };
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.value}</h2>
        <Form placeholder="video" handleChange={this.handleChange.bind(this)} />
        <button onClick={this.handleClick.bind(this)}>Submit</button>
        <br/>
        {/* Remove your controls attribute, then u can bring your own UI */}
        {/* controls="controls autoplay" is meaningless i think */}
        <video width="320" height="240" controls="controls autoplay">
          <source src="./globe.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Homepage;
