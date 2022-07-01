// https://github.com/bitmovin/mse-demo/blob/main/index.html
const mseSegmentBufferBuilder = (numberOfSegments, video, audio) => {
  const vidElement = document.querySelector('video');

  const { videoInitUrl, videoSegmentTemplateUrl, videoMime } = video || {};
  const { audioInitUrl, audioSegmentTemplateUrl, audioMime } = audio || {};

  let videoSourceBuffer;
  let audioSourceBuffer;
  let videoSegmentIndex = 1;
  let audioSegmentIndex = 1;

  if (!window.MediaSource) {
    console.error('The Media Source Extensions API is not supported.');
    return;
  }

  const mediaSource = new MediaSource();
  // In HTML the <videoElement> gets manipulated by the MSE API.
  // The video element has a src property. This line creates a fake URL for the in-memory file
  // so that it can read the segment
  vidElement.src = window.URL.createObjectURL(mediaSource);

  if (video !== null) {
    if (!MediaSource.isTypeSupported(videoMime)) {
      console.error('MediaType is not supported');
      return;
    }

    mediaSource.addEventListener('sourceopen', sourceVideoOpen);
  };

  if (audio !== null) {
    if (!MediaSource.isTypeSupported(audioMime)) {
      console.error('MediaType is not supported');
      return;
    }

    mediaSource.addEventListener('sourceopen', sourceAudioOpen);
  };

  mediaSource.addEventListener('error', function(e) {
    console.log('error', e);
  });

  // SEARCH IN MERCURY:
  // videoElement.addEventListener('seeking', this.handleSeeking);

  function sourceVideoOpen() {
    videoSourceBuffer = mediaSource.addSourceBuffer(videoMime);
    videoSourceBuffer.addEventListener('updateend', function nextSegment() {
      const videoUrl = videoSegmentTemplateUrl.replace('$Number$', videoSegmentIndex);

      // Add the segments in the Urls to the buffer via callback
      xmlHttpRequestGet(videoUrl, appendToVideoBuffer);

      // recursion
      videoSegmentIndex++;

      // we added the eventListener updateend above, however
      // we don't want to have it if we haven't finished looping over all the segments
      if (videoSegmentIndex > numberOfSegments) {
        console.log('videoSegment');
        videoSourceBuffer.removeEventListener('updateend', nextSegment);
        mediaSource.addEventListener('sourceopen', sourceAudioOpen);
      }
    });

    // Add the videoInitUrl to the buffer
    xmlHttpRequestGet(videoInitUrl, appendToVideoBuffer);
  }

  function sourceAudioOpen() {
    audioSourceBuffer = mediaSource.addSourceBuffer(audioMime);
    audioSourceBuffer.addEventListener('updateend', function nextSegment() {
      const audioUrl = audioSegmentTemplateUrl.replace('$Number$', audioSegmentIndex);

      xmlHttpRequestGet(audioUrl, appendToAudioBuffer);

      audioSegmentIndex++;

      if (audioSegmentIndex > numberOfSegments) {
        audioSourceBuffer.removeEventListener('updateend', nextSegment);
      }
    });

    xmlHttpRequestGet(audioInitUrl, appendToAudioBuffer);

    vidElement.play();
  }

  // Each video chunk (or video segment) is just a binary array.
  // Segments get added to the buffer, so the buffer is just an array of binary-arrays.
  // Chrome reads the array of binary-arrays.
  function appendToVideoBuffer(segmentChunk) {
    if (segmentChunk) {
      videoSourceBuffer.appendBuffer(new Uint8Array(segmentChunk));
    }
  }

  function appendToAudioBuffer(segmentChunk) {
    if (segmentChunk) {
      audioSourceBuffer.appendBuffer(new Uint8Array(segmentChunk));
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

export default mseSegmentBufferBuilder;
