// Most comments in this file

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

  // In HTML the <videoElement> gets manipulated by the MSE API.
  // The video element has a src property. This line creates a fake URL for the in-memory file
  // so that it can read the segment
  vidElement.src = window.URL.createObjectURL(mediaSource);

  mediaSource.addEventListener('sourceopen', sourceOpen);

  // SEARCH IN MERCURY:
  // videoElement.addEventListener('seeking', this.handleSeeking);

  function sourceOpen() {
    sourceBuffer = mediaSource.addSourceBuffer(mime);
    sourceBuffer.addEventListener('updateend', nextSegment);

    // Add the initUrl to the buffer
    xmlHttpRequestGet(initUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment in recursive fashion
  function nextSegment() {
    const url = segmentTemplateUrl.replace('$Number$', segmentIndex);

    // Add all the segments to the buffer
    xmlHttpRequestGet(url, appendToBuffer);

    segmentIndex++;

    // we added the eventListener updateend above, however
    // we don't want to have it if we haven't finished looping over all the segments
    if (segmentIndex > numberOfSegments) {
      sourceBuffer.removeEventListener('updateend', nextSegment);
    }
  }

  // Each video chunk (or video segment) is just a binary array.
  // Segments get added to the buffer, so the buffer is just an array of binary-arrays.
  // Chrome reads the array of binary-arrays.
  function appendToBuffer(videoChunk) {
    if (videoChunk) {
      console.log('videoChunk', videoChunk);
      sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
      console.log('sourceBuffer', sourceBuffer);
    }
  }

  function xmlHttpRequestGet(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';

    console.log('url', url);

    xhr.onload = function(e) {
      if (xhr.status != 200) {
        console.warn('Unexpected status code ' + xhr.status + ' for ' + url);
        return false;
      }
      // xhr.response = videoChunk. videoChunk is just a buffer (an Array)
      console.log('xhr.response', xhr.response);
      callback(xhr.response);
    };

    xhr.send();
  }
};

export default mseMangoOpenMovie;
