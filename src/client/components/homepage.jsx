import React, {Component} from 'react';

import Form from './form';
import Video from './video';

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
        <Video width="320" height="240" controls="controls autoplay" />
      </div>
    );
  }
}

export default Homepage;
