const mse = () => {
  const vidElement = document.querySelector('video');

  // must get mime type right, bespoke to video
  const videoUrl = 'bunny.mp4';
  const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  // const videoUrl = 'globe.mp4';
  // const mime = ?????? HEVC or AAC in the section: Get info > More Dimensions >;

  if (!window.MediaSource) {
    console.error('The Media Source Extensions API is not supported.');
    return;
  }

  if (!MediaSource.isTypeSupported(mime)) {
    console.error('MediaType is not supported');
    return;
  }

  const mediaSource = new MediaSource();
  vidElement.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);

  function sourceOpen(e) {
    URL.revokeObjectURL(vidElement.src);
    const mediaSource = e.target;
    const sourceBuffer = mediaSource.addSourceBuffer(mime);

    fetch(videoUrl)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(arrayBuffer) {
          sourceBuffer.addEventListener('updateend', segment);
          sourceBuffer.appendBuffer(arrayBuffer);
        });
  }

  function segment(e) {
    if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
      mediaSource.endOfStream();
    }
  }
};

export default mse;
