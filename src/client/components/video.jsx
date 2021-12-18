import React from 'react';
import PropTypes from 'prop-types';

// have to import here so that the video element has access to it
import globe from '../../assets/globe';
import bunny from '../../assets/bunny';

const Video = (props) => {
  const { width, height, controls } = props;

  return (
    <video width={width} height={height} controls={controls}>
    </video>
  );
};

Video.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  controls: PropTypes.string.isRequired,
};

export default Video;
