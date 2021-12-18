const mse = () => {
  const vidElement = document.querySelector('video');
  if (window.MediaSource) {
    console.log('----------', vidElement);
    // const mediaSource = new MediaSource();
    // vidElement.src = URL.createObjectURL(mediaSource);
    // console.log('hello --', vidElement);
    // // mediaSource.addEventListener('sourceopen', sourceOpen);
    // console.log(mediaSource);
  } else {
    console.log('The Media Source Extensions API is not supported.')
  }
};

export default mse;
