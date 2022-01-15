import mseSegmentBufferBuilder from './mseSegmentBufferBuilder';

const mangoOpenMovie = () => {
  const videoBaseUrl = '/assets/mangoOpenMovie/';

  const video = {
    videoInitUrl: videoBaseUrl + 'init.mp4',
    videoSegmentTemplateUrl: videoBaseUrl + 'seg-$Number$.m4s',
    videoMime: 'video/mp4; codecs="avc1.4d401f"',
  };

  // must get mime type right, bespoke to the static video

  const numberOfSegments = 15;

  mseSegmentBufferBuilder(numberOfSegments, video, null);
};

export default mangoOpenMovie;
