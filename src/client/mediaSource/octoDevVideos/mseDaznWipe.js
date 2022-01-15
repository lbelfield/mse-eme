// TODO: Configure Webpack for process.env

const mseDaznWipe = () => {
  const vidElement = document.querySelector('video');

  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/dazn-wipe/video_4113000/';
  const videoInitUrl = videoBaseUrl + 'init.mp4';
  const videoSegmentTemplateUrl = videoBaseUrl + '$Number$.mp4';

  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/dazn-wipe/audio_127000/';
  const audioInitUrl = audioBaseUrl + 'init.mp4';
  const audioSegmentTemplateUrl = audioBaseUrl + '$Number$.mp4';

  // must get mime type right, bespoke to video
  const mime = 'video/mp4; codecs="avc1.4d401f"';

  let sourceBuffer;
  let segmentIndex = 1;
  const numberOfSegments = 3;

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

  function sourceOpen() {
    sourceBuffer = mediaSource.addSourceBuffer(mime);
    sourceBuffer.addEventListener('updateend', nextSegment);

    // Add the videoInitUrl to the buffer
    xmlHttpRequestGet(videoInitUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment
  function nextSegment() {
    const url = videoSegmentTemplateUrl.replace('$Number$', segmentIndex);

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

export default mseDaznWipe;
