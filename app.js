const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const detectButton = document.getElementById('detect');

// Solicitar permissão para acessar a câmera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error("Erro ao acessar a câmera: ", err);
  });

detectButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
     

      if (isBlack(red, green, blue)) {
        markBlackBlock(x, y);
      }
    }
  }
});

function isRed(r, g, b) {
  return r > 150 && g < 100 && b < 100;
}

function isBlack(r, g, b) {
    return r < 10 && g < 10 && b < 10;
  }

// function markRedBlock(x, y) {
//   context.beginPath();
//   context.arc(x, y, 50, 0, 2 * Math.PI);
//   context.lineWidth = 2;
//   context.strokeStyle = 'red';
//   context.stroke();
// }
function markBlackBlock(x, y) {
    context.beginPath();
    context.rect(x, y,1 ,1 );
    context.strokeStyle = 'blue';
    context.stroke();
  }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((error) => {
      console.log('Falha ao registrar o Service Worker:', error);
    });
}
