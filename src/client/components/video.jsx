import React from 'react';
import PropTypes from 'prop-types';

// have to import here so that the video element has access to it
import globe from '../../assets/globe';

import bunny from '../../assets/bunny';

import init from '../../assets/mangoOpenMovie/init';
import seg from '../../assets/mangoOpenMovie/seg-1.m4s';
import seg2 from '../../assets/mangoOpenMovie/seg-2.m4s';
import seg3 from '../../assets/mangoOpenMovie/seg-3.m4s';
import seg4 from '../../assets/mangoOpenMovie/seg-4.m4s';
import seg5 from '../../assets/mangoOpenMovie/seg-5.m4s';
import seg6 from '../../assets/mangoOpenMovie/seg-6.m4s';
import seg7 from '../../assets/mangoOpenMovie/seg-7.m4s';
import seg8 from '../../assets/mangoOpenMovie/seg-8.m4s';
import seg9 from '../../assets/mangoOpenMovie/seg-9.m4s';
import seg10 from '../../assets/mangoOpenMovie/seg-10.m4s';
import seg11 from '../../assets/mangoOpenMovie/seg-11.m4s';
import seg12 from '../../assets/mangoOpenMovie/seg-12.m4s';
import seg13 from '../../assets/mangoOpenMovie/seg-13.m4s';
import seg14 from '../../assets/mangoOpenMovie/seg-14.m4s';
import seg15 from '../../assets/mangoOpenMovie/seg-15.m4s';

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
