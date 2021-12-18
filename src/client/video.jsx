import React from 'react';
import PropTypes from 'prop-types';

import globe from '../assets/globe';

const Video = (props) => {
  const { width, height, controls } = props;
  // {/* Remove your controls attribute, then u can bring your own UI */}
  // {/* controls="controls autoplay" is meaningless i think */}

  return (
    <video width={width} height={height} controls={controls}>
      <source src="./globe.mp4" type="video/mp4" />
    </video>
  );
};

Video.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  controls: PropTypes.string.isRequired,
};

export default Video;
