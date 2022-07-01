import mseSegmentBufferBuilder from '../mseSegmentBufferBuilder';

const asahiAudio = () => {
  const audioBaseUrl = '/assets/octo-dev-videos/dash/ads/asahi/audio_127000/';

  const audio = {
    audioInitUrl: audioBaseUrl + 'init.mp4',
    audioSegmentTemplateUrl: audioBaseUrl + '$Number$.mp4',
    audioMime: 'audio/mp4; codecs="mp4a.40.2"',
  };

  // must get mime type right, bespoke to the static video

  const numberOfSegments = 8;

  mseSegmentBufferBuilder(numberOfSegments, null, audio);
};

export default asahiAudio;
