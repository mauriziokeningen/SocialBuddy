const video = document.getElementById('video');
const feedback = document.getElementById('feedback');
const emocionObjetivo = 'happy'; // Puedes cambiarla a otra

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('Error al acceder a la cámara:', err);
      feedback.innerText = 'No se pudo acceder a la cámara';
    });
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.appendChild(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const resized = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];
      console.log("Detectado:", topExpression);
      feedback.innerText = `Tu emoción: ${traducir(topExpression)}`;

      if (topExpression === emocionObjetivo) {
        feedback.innerText = '✅ ¡Muy bien!';
      }
    }
  }, 1000);
});

function traducir(exp) {
  const mapa = {
    happy: 'felicidad',
    sad: 'tristeza',
    angry: 'enojo',
    surprised: 'sorpresa',
    disgusted: 'asco',
    fearful: 'miedo',
    neutral: 'neutral'
  };
  return mapa[exp] || exp;
}
