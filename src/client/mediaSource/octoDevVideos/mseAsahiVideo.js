// TODO: Configure Webpack for process.env

const mseAsahiVideo = () => {
  const vidElement = document.querySelector('video');
  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/video_4113000/';
  const videoInitUrl = videoBaseUrl + 'init.mp4';
  const videoSegmentTemplateUrl = videoBaseUrl + '$Number$.mp4';
  const mime = 'video/mp4; codecs="avc1.4d401f"';

  let sourceBuffer;
  let videoSegmentIndex = 1;
  const numberOfSegments = 8;

  const mediaSource = new MediaSource();
  vidElement.src = window.URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);

  function sourceOpen() {
    sourceBuffer = mediaSource.addSourceBuffer(mime);

    sourceBuffer.addEventListener('updateend', function nextSegment() {
      const videoUrl = videoSegmentTemplateUrl.replace('$Number$', videoSegmentIndex);

      // Add all the segments to the buffer
      xmlHttpRequestGet(videoUrl, appendToBuffer);

      videoSegmentIndex++;

      if (videoSegmentIndex > numberOfSegments) {
        console.log('nextSegment', nextSegment);
        sourceBuffer.removeEventListener('updateend', nextSegment);
      }
    });

    // Add the videoInitUrl to the buffer
    xmlHttpRequestGet(videoInitUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment

  function appendToBuffer(videoChunk) {
    if (videoChunk) {
      // console.log('videoChunk', videoChunk);
      sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
      // console.log('sourceBuffer', sourceBuffer);
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
      // console.log('xhr.response', xhr.response);
      callback(xhr.response);
    };

    xhr.send();
  }
};

export default mseAsahiVideo;
