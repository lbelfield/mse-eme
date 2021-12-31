// have to import here so that the video element has access to it
import videoAsahiInit from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/init.mp4';
import videoAsahi1 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/1.mp4';
import videoAsahi2 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/2.mp4';
import videoAsahi3 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/3.mp4';
import videoAsahi4 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/4.mp4';
import videoAsahi5 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/5.mp4';
import videoAsahi6 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/6.mp4';
import videoAsahi7 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/7.mp4';
import videoAsahi8 from '../../../assets/octo-dev-videos/dash/ads/asahi/video_4113000/8.mp4';

// TODO: Configure Webpack for process.env

const mseAsahiVideo = () => {
  const vidElement = document.querySelector('video');

  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/video_4113000/';
  const videoInitUrl = videoBaseUrl + 'init.mp4';
  const videoSegmentTemplateUrl = videoBaseUrl + '$Number$.mp4';

  // must get mime type right, bespoke to video
  // TODO: AAC MIME for Audio
  // const audioMime = 'audio/mp4; codecs="mp4a.40.5"';
  // note:
  // avc1.4d401f = video
  // mp4a.40.5 = audio
  const mime = 'video/mp4; codecs="avc1.4d401f"';
  // const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

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

    // Add the videoInitUrl to the buffer
    xmlHttpRequestGet(videoInitUrl, appendToBuffer);

    vidElement.play();
  }

  // loop over each segment
  function nextSegment() {
    const videoUrl = videoSegmentTemplateUrl.replace('$Number$', segmentIndex);

    // Add all the segments to the buffer
    xmlHttpRequestGet(videoUrl, appendToBuffer);

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

export default mseAsahiVideo;
