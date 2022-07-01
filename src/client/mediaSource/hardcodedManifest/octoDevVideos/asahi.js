import mseSegmentBufferBuilder from '../mseSegmentBufferBuilder';

const asahi = () => {
  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/video_4113000/';
  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/audio_127000/';

  const video = {
    videoInitUrl: videoBaseUrl + 'init.mp4',
    videoSegmentTemplateUrl: videoBaseUrl + '$Number$.mp4',
    videoMime: 'video/mp4; codecs="avc1.42E01E"',
  };

  // must get mime type right, bespoke to the static video

  const audio = {
    audioInitUrl: audioBaseUrl + 'init.mp4',
    audioSegmentTemplateUrl: audioBaseUrl + '$Number$.mp4',
    audioMime: 'video/mp4; codecs="mp4a.40.2"',
  };

  const numberOfSegments = 8;

  mseSegmentBufferBuilder(numberOfSegments, video, audio);
};

export default asahi;
