const video = document.getElementById('video');
const feedback = document.getElementById('feedback');
const spanEmocion = document.getElementById('emocion-objetivo');

const emocionesDisponibles = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
let emocionObjetivo = obtenerNuevaEmocion();

let intervalo = null; // Guardar referencia al intervalo
let canvas = null; // Guardar referencia al canvas para eliminarlo si es necesario

async function iniciar() {
  await faceapi.tf.setBackend('webgl');
  await faceapi.tf.ready();

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]);

  startVideo();
}

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    })
    .catch(err => {
      console.error('Error al acceder a la cámara:', err);
      feedback.innerText = 'No se pudo acceder a la cámara';
    });
}

function obtenerNuevaEmocion(actual = null) {
  let nuevas = emocionesDisponibles.filter(e => e !== actual);
  const nueva = nuevas[Math.floor(Math.random() * nuevas.length)];
  spanEmocion.innerText = traducir(nueva);
  return nueva;
}

video.addEventListener('play', () => {
  const container = document.getElementById('video-container');
  canvas = faceapi.createCanvasFromMedia(video);
  container.appendChild(canvas);

  intervalo = setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const resized = faceapi.resizeResults(detections, displaySize);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];
      console.log("Detectado:", topExpression);
      feedback.innerText = `Tu emoción: ${traducir(topExpression)}`;

      if (topExpression === emocionObjetivo) {
        feedback.innerText = '✅ ¡Muy bien!';
        emocionObjetivo = obtenerNuevaEmocion(emocionObjetivo);
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

iniciar();

document.getElementById('salir-btn').addEventListener('click', () => {
  // Detener el intervalo
  if (intervalo) clearInterval(intervalo);

  // Detener la cámara
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  // Eliminar canvas si existe
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }

  // Redirigir
  window.location.href = 'mainMenu.html';
});
