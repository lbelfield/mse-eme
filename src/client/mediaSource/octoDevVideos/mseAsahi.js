// have to import here so that the video element has access to it

// TODO: Configure Webpack for process.env

const mseAsahi = () => {
  const vidElement = document.querySelector('video');

  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/video_4113000/';
  const videoInitUrl = videoBaseUrl + 'init.mp4';
  const videoSegmentTemplateUrl = videoBaseUrl + '$Number$.mp4';
  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/audio_127000/';
  const audioInitUrl = audioBaseUrl + 'init.mp4';
  const audioSegmentTemplateUrl = audioBaseUrl + '$Number$.mp4';
  const videoMime = 'video/mp4; codecs="avc1.42E01E"';
  const audioMime = 'video/mp4; codecs="mp4a.40.2"';

  let videoSourceBuffer;
  let audioSourceBuffer;
  let videoSegmentIndex = 1;
  let audioSegmentIndex = 1;
  const numberOfSegments = 8;

  const mediaSource = new MediaSource();
  // In HTML the <videoElement> gets manipulated by the MSE API.
  // The video element has a src property. This line creates a fake URL for the in-memory file
  // so that it can read the segment
  vidElement.src = window.URL.createObjectURL(mediaSource);

  mediaSource.addEventListener('sourceopen', sourceVideoOpen);
  mediaSource.addEventListener('sourceopen', sourceAudioOpen);

  mediaSource.addEventListener('error', function(e) {
    console.log('error', e);
  });

  function sourceVideoOpen() {
    videoSourceBuffer = mediaSource.addSourceBuffer(videoMime);
    videoSourceBuffer.addEventListener('updateend', function nextSegment() {
      const videoUrl = videoSegmentTemplateUrl.replace('$Number$', videoSegmentIndex);

      xmlHttpRequestGet(videoUrl, appendToVideoBuffer);

      videoSegmentIndex++;

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

    // TODO: AAC MIME for Audio
    xmlHttpRequestGet(audioInitUrl, appendToAudioBuffer);

    vidElement.play();
  }

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
      callback(xhr.response);
    };

    xhr.send();
  }
};

export default mseAsahi;
