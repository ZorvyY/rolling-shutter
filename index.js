const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  canvas.height = player.videoHeight;
  canvas.width = player.videoWidth;
  (function thing(offset) {
    if (offset < 0) return;
    context.drawImage(player, 
      0, player.videoHeight - offset,
      player.videoWidth, 2,
      0, canvas.height - offset, canvas.width, 2);
    requestAnimationFrame(() => thing(offset - 1));
    //setTimeout(() => thing(offset-1), 1);
  })(canvas.height);
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });
