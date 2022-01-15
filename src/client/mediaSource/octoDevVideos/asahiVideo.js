import mseSegmentBufferBuilder from '../mseSegmentBufferBuilder';

const asahiVideo = () => {
  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/video_4113000/';

  const video = {
    videoInitUrl: videoBaseUrl + 'init.mp4',
    videoSegmentTemplateUrl: videoBaseUrl + '$Number$.mp4',
    videoMime: 'video/mp4; codecs="avc1.42E01E"',
  };

  // must get mime type right, bespoke to the static video

  const numberOfSegments = 8;

  mseSegmentBufferBuilder(numberOfSegments, video, null);
};

export default asahiVideo;