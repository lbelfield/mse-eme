import mseSegmentBufferBuilder from '../mseSegmentBufferBuilder';

const daznWipe = () => {
  const videoBaseUrl = '/assets/octo-dev-videos/dash/ads/dazn-wipe/video_4113000/';
  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/dazn-wipe/audio_127000/';

  const numberOfSegments = 3;

  const video = {
    videoInitUrl: videoBaseUrl + 'init.mp4',
    videoSegmentTemplateUrl: videoBaseUrl + '$Number$.mp4',
    videoMime: 'video/mp4; codecs="avc1.4d401f"',
  };

  // must get mime type right, bespoke to the static video

  // TODO: Get audio to work. Is it an incompatible AudioMimeType???
  // const audio = {
  //   audioInitUrl: audioBaseUrl + 'init.mp4',
  //   audioSegmentTemplateUrl: audioBaseUrl + '$Number$.mp4',
  //   audioMime: 'video/mp4; codecs="avc1.4d401f"',
  // };

  mseSegmentBufferBuilder(numberOfSegments, video, null);
};

export default daznWipe;
