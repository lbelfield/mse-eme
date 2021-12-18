const mse = () => {
  const vidElement = document.querySelector('video');

  // const videoUrl = 'globe.mp4';
  // const mime = ?????? HEVC or AAC in the section: Get info > More Dimensions >;

  const videoUrl = 'bunny.mp4';
  const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

  if ('MediaSource' in window && MediaSource.isTypeSupported(mime)) {
    const mediaSource = new MediaSource();
    vidElement.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.log('The Media Source Extensions API is not supported.');
  }

  function sourceOpen(e) {
    URL.revokeObjectURL(vidElement.src);
    const mediaSource = e.target;
    const sourceBuffer = mediaSource.addSourceBuffer(mime);
    fetch(videoUrl)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(arrayBuffer) {
          sourceBuffer.addEventListener('updateend', function(e) {
            if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
              mediaSource.endOfStream();
            }
          });
          sourceBuffer.appendBuffer(arrayBuffer);
        });
  }
};

export default mse;
