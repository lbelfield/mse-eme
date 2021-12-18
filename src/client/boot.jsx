import React from 'react';
import ReactDOM from 'react-dom';

import Homepage from './components/homepage';
import mse from './mediaSource/mse';

const boot = () => {
  if (typeof window !== 'undefined') {
    const wrapper = document.getElementById('container');
    wrapper ? ReactDOM.render(<Homepage />, wrapper) : false;
  }

  mse();
};

export default boot;
