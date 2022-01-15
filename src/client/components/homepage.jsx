import React, {Component} from 'react';
import ToggleButton from 'react-toggle-button';

import Form from './form';
import Video from './video';
import mseBunny from '../mediaSource/bunny';
import mseMangoOpenMovie from '../mediaSource/mangoOpenMovie';
import mseOctoDevVideoAsahi from '../mediaSource/octoDevVideos/asahi';
import mseOctoDevVideoAbrAsahi from '../mediaSource/octoDevVideos/abrAsahi';
import mseOctoDevVideoAsahiAudio from '../mediaSource/octoDevVideos/asahiAudio';
import mseOctoDevVideoAsahiVideo from '../mediaSource/octoDevVideos/asahiVideo';
import mseOctoDevVideoDaznWipe from '../mediaSource/octoDevVideos/daznWipe';
import data from '../../assets/data';

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      videoTitle: 'Click the buttons to choose the video',
      toggleButtonValue: false,
    };
  }

  handleClick() {
    this.setState(() => {
      return {
        value: 'Button Clicked',
      };
    });
  }

  handleMseBunnyClick() {
    mseBunny();
    this.setState(() => {
      return {
        videoTitle: 'Bunny - playing...',
      };
    });
  }

  handleMseMangoOpenMovieClick() {
    mseMangoOpenMovie();
    this.setState(() => {
      return {
        videoTitle: 'Kuba Workshop - Mango... playing...',
      };
    });
  }

  handleMseOctoDevVideoAsahiClick() {
    mseOctoDevVideoAsahi();
    this.setState(() => {
      return {
        videoTitle: 'Asahi... playing...',
      };
    });
  }

  handleMseOctoDevVideoAbrAsahiClick() {
    mseOctoDevVideoAbrAsahi(this.state.toggleButtonValue);
    this.setState(() => {
      return {
        videoTitle: 'ABR Asahi... playing...',
      };
    });
  }

  handleMseOctoDevVideoAsahiVideoClick() {
    mseOctoDevVideoAsahiVideo();
    this.setState(() => {
      return {
        videoTitle: 'Asahi Video... playing...',
      };
    });
  }

  handleMseOctoDevVideoAsahiAudioClick() {
    mseOctoDevVideoAsahiAudio();
    this.setState(() => {
      return {
        videoTitle: 'Asahi Audio... playing...',
      };
    });
  }

  handleMseOctoDevVideoDaznWipeClick() {
    mseOctoDevVideoDaznWipe();
    this.setState(() => {
      return {
        videoTitle: 'DAZN Wipe... playing...',
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

  handleToggleButtonClick(toggleButtonValue) {
    this.setState({
      toggleButtonValue: !toggleButtonValue,
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.videoTitle}</h2>
        <br/>
        <button onClick={this.handleMseOctoDevVideoAbrAsahiClick.bind(this)}>octo-dev-videos ABR Ashai</button>
        <ToggleButton
          value={ this.state.toggleButtonValue || false }
          onToggle={this.handleToggleButtonClick.bind(this)}
        />
        <br/>
        <button onClick={this.handleMseOctoDevVideoAsahiClick.bind(this)}>octo-dev-videos Ashai</button>
        <br/>
        <button onClick={this.handleMseBunnyClick.bind(this)}>Bunny</button>
        <button onClick={this.handleMseMangoOpenMovieClick.bind(this)}>Kuba Workshop - Mango</button>
        <button onClick={this.handleMseOctoDevVideoAsahiVideoClick.bind(this)}>octo-dev-videos Ashai VIDEO</button>
        <button onClick={this.handleMseOctoDevVideoAsahiAudioClick.bind(this)}>octo-dev-videos Ashai AUDIO</button>
        <button onClick={this.handleMseOctoDevVideoDaznWipeClick.bind(this)}>octo-dev-videos Dazn Wipe</button>
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
