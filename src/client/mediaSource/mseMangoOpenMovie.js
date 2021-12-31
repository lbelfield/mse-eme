// have to import here so that the video element has access to it
import init from '../../assets/mangoOpenMovie/init.mp4';
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

// TODO: Configure Webpack for process.env

// https://github.com/bitmovin/mse-demo/blob/main/index.html
const mseMangoOpenMovie = () => {
  const vidElement = document.querySelector('video');

  const baseUrl = '/assets/mangoOpenMovie/';
  const initUrl = baseUrl + 'init.mp4';
  const segmentTemplateUrl = baseUrl + 'seg-$Number$.m4s';

  // must get mime type right, bespoke to video
  const mime = 'video/mp4; codecs="avc1.4d401f"';

  let sourceBuffer;
  let segmentIndex = 1;
  const numberOfSegments = 15;

  if (!window.MediaSource) {
    console.error('The Media Source Extensions API is not supported.');
    return;
  }

  if (!MediaSource.isTypeSupported(mime)) {
    console.error('MediaType is not supported');
    return;
  }

  const mediaSource = new MediaSource();
  vidElement.src = window.URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);

  function sourceOpen() {
    sourceBuffer = mediaSource.addSourceBuffer(mime);
    sourceBuffer.addEventListener('updateend', nextSegment);

    // Add the initUrl to the buffer
    xmlHttpRequestGet(initUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment
  function nextSegment() {
    const url = segmentTemplateUrl.replace('$Number$', segmentIndex);

    // Add all the segments to the buffer
    xmlHttpRequestGet(url, appendToBuffer);

    segmentIndex++;

    if (segmentIndex > numberOfSegments) {
      sourceBuffer.removeEventListener('updateend', nextSegment);
    }
  }

  function appendToBuffer(videoChunk) {
    if (videoChunk) {
      sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
    }
  }

  function xmlHttpRequestGet(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';

    console.log(xhr);

    xhr.onload = function(e) {
      if (xhr.status != 200) {
        console.warn('Unexpected status code ' + xhr.status + ' for ' + url);
        return false;
      }
      callback(xhr.response);
    };

    xhr.send();
  }
};

export default mseMangoOpenMovie;
