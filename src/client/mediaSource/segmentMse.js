const segmentMse = () => {
  const vidElement = document.querySelector('video');

  const initUrl = 'init.mp4';
  const segmentTemplateUrl = 'seg-$Number$.m4s';

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
    GET(initUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment
  function nextSegment() {
    const url = segmentTemplateUrl.replace('$Number$', segmentIndex);

    // Add all the segments to the buffer
    GET(url, appendToBuffer);

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

  function GET(url, callback) {
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

export default segmentMse;
