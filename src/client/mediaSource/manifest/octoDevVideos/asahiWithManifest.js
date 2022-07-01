
import { parse } from 'mpd-parser';
import manifestUri from '../../../../assets/octo-dev-videos/dash/ads/asahi/stream.mpd';
import mseSegmentBufferBuilder from './mseSegmentBufferBuilder';


async function asahi() {
  const res = await fetch(manifestUri);

  const manifest = await res.text();
  console.log("MANIFEST LOG", manifest);

  const parsedManifest = parse(manifest, { manifestUri });

  build(parsedManifest);

  // Do Not remove - vital for demo
  console.log("PARSED MANIFEST OBJECT", parsedManifest);
};

const build = (parsedManifest) => {
  const video = {
    videoSegmentArray: parsedManifest.playlists[0].segments,
    videoMime: 'video/mp4; codecs="' + parsedManifest.playlists[0].attributes.CODECS + '"',
  };

  const audio = {
    audioSegmentArray: parsedManifest.mediaGroups.AUDIO.audio.en.playlists[0].segments,
    audioMime: 'video/mp4; codecs="' + parsedManifest.mediaGroups.AUDIO.audio.en.playlists[0].attributes.CODECS + '"',
  };

  mseSegmentBufferBuilder(video, audio);
};

export default asahi;
