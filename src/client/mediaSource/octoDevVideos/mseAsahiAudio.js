// TODO: Configure Webpack for process.env

const mseAsahiAudio = () => {
  const vidElement = document.querySelector('video');

  // TODO: AAC MIME for Audio
  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/audio_127000/';
  const audioInitUrl = audioBaseUrl + 'init.mp4';
  const audioSegmentTemplateUrl = audioBaseUrl + '$Number$.mp4';

  // must get mime type right, bespoke to video
  // TODO: AAC MIME for Audio
  // const audioMime = 'audio/mp4; codecs="mp4a.40.5"';
  // note:
  // avc1.4d401f = video
  // mp4a.40.5 = audio
  // const mime = 'video/mp4; codecs="avc1.4d401f, mp4a.40.5"';
  const mime = 'audio/mp4; codecs="mp4a.40.2"';

  let sourceBuffer;
  let segmentIndex = 1;
  const numberOfSegments = 8;

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

    xmlHttpRequestGet(audioInitUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment
  function nextSegment() {
    const audioUrl = audioSegmentTemplateUrl.replace('$Number$', segmentIndex);

    // Add all the segments to the buffer
    xmlHttpRequestGet(audioUrl, appendToBuffer);

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

export default mseAsahiAudio;
