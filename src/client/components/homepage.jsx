import React, {Component} from 'react';

import Form from './form';
import Video from './video';
import mse from '../mediaSource/mse';
import segmentMse from '../mediaSource/segmentMse';

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      videoTitle: 'Click the buttons to choose the video',
    };
  }

  handleClick() {
    this.setState(() => {
      return {
        value: 'Button Clicked',
      };
    });
  }

  handleMseClick() {
    mse();
    this.setState(() => {
      return {
        videoTitle: 'Bunny - playing...',
      };
    });
  }

  handleSegmentMseClick() {
    segmentMse();
    this.setState(() => {
      return {
        videoTitle: 'Kuba Workshop - Mango... playing...',
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
        <h2>{this.state.videoTitle}</h2>
        <br/>
        <button onClick={this.handleMseClick.bind(this)}>Bunny</button>
        <button onClick={this.handleSegmentMseClick.bind(this)}>Kuba Workshop - Mango</button>
        <br/>
        <Video width="320" height="240" controls="controls autoplay" />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>{this.state.value}</h2>
        <Form placeholder="video" handleChange={this.handleChange.bind(this)} />
        <button onClick={this.handleClick.bind(this)}>Submit</button>
        <br/>
      </div>
    );
  }
}

export default Homepage;
