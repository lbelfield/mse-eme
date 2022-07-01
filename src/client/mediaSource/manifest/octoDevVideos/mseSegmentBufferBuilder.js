const mseSegmentBufferBuilder = (video, audio) => {
  const vidElement = document.querySelector('video');

  const { videoMime, videoSegmentArray } = video || {};
  const { audioMime, audioSegmentArray } = audio || {};

  // get the PARSED MANIFEST OBJECT's video segment initUri
  const videoInitUrl = videoSegmentArray[0].map.resolvedUri;
  console.log('videoInitUrl = ', videoInitUrl);

  // get the PARSED MANIFEST OBJECT's audio segment initUri
  const audioInitUrl = audioSegmentArray[0].map.resolvedUri;
  console.log('audioInitUrl = ', audioInitUrl);

  // so we know how many segments in the array to iterate over
  const numberOfSegments = videoSegmentArray.length;
  console.log("number of segments = ", numberOfSegments);

  let videoSourceBuffer;
  let audioSourceBuffer;
  let videoSegmentIndex = 0;
  let audioSegmentIndex = 0;

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

  function sourceVideoOpen() {
    videoSourceBuffer = mediaSource.addSourceBuffer(videoMime);
    videoSourceBuffer.addEventListener('updateend', function nextSegment() {
      // iterate over the PARSED MANIFEST OBJECT's video segment URIs
      const videoUrl = videoSegmentArray[videoSegmentIndex].resolvedUri;
      console.log('video URL for ', videoSegmentIndex, ' = ', videoUrl);

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
      // iterate over the PARSED MANIFEST OBJECT's audio segment URIs
      const audioUrl = audioSegmentArray[audioSegmentIndex].resolvedUri;
      console.log('audio URL for ', audioSegmentIndex, ' = ', audioUrl);

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
      callback(xhr.response);
    };

    xhr.send();
  }
};

export default mseSegmentBufferBuilder;
