const emotions = [
  {
    category: "felicidad",
    images: [
      "assets/faces/felicidad1.jpeg",
      "assets/faces/felicidad2.jpeg",
      "assets/faces/felicidad3.jpg",
    ]
  },
  {
    category: "tristeza",
    images: [
      "assets/faces/tristeza1.jpeg",
      "assets/faces/tristeza2.jpeg",
      "assets/faces/tristeza3.jpg"
    ]
  },
  {
    category: "enojo",
    images: [
      "assets/faces/enojo1.jpeg",
      "assets/faces/enojo2.jpeg",
      "assets/faces/enojo3.jpg"
    ]
  },
  {
    category: "miedo",
    images: [
      "assets/faces/miedo1.jpeg",
      "assets/faces/miedo2.jpeg",
      "assets/faces/miedo3.jpg"
    ]
  }
];

let currentEmotion = null;
let score = 0;
let currentQuestion = 0;
const totalQuestions = 10;
let awaitingCorrect = true;

// Aquí guardamos las imágenes ya mostradas para no repetir
const shownImages = new Set();

function loadRandomEmotion() {
  // Construimos una lista con todas las imágenes que NO se han mostrado
  const available = [];

  emotions.forEach(emotion => {
    emotion.images.forEach(image => {
      if (!shownImages.has(image)) {
        available.push({ category: emotion.category, image });
      }
    });
  });

  if (available.length === 0) {
    // Ya no quedan imágenes nuevas
    alert("¡Ya viste todas las imágenes!");
    // Opcional: reiniciar o terminar el juego
    // window.location.href = `resultadosEmocion.html?score=${score}&total=${totalQuestions}`;
    return;
  }

  // Elegir una imagen al azar de las disponibles
  const randomIndex = Math.floor(Math.random() * available.length);
  const chosen = available[randomIndex];

  currentEmotion = {
    category: chosen.category,
    image: chosen.image
  };

  // Marcar imagen como mostrada
  shownImages.add(chosen.image);

  awaitingCorrect = true;

  document.getElementById("emotion-img").src = chosen.image;
}

function checkAnswer(answer) {
  const feedback = document.getElementById("feedback");

  if (answer === currentEmotion.category) {
    feedback.textContent = "¡Correcto!";
    feedback.style.color = "green";

    if (awaitingCorrect) {
      score++; // Solo suma si no ha fallado antes
    }

    currentQuestion++;

    setTimeout(() => {
      if (currentQuestion >= totalQuestions) {
        window.location.href = `resultadosEmocion.html?score=${score}&total=${totalQuestions}`;
      } else {
        feedback.textContent = "Selecciona la emoción correcta";
        feedback.style.color = "#666";
        loadRandomEmotion();
      }
    }, 1500);
  } else {
    feedback.textContent = "Inténtalo de nuevo.";
    feedback.style.color = "red";

    // Ya no cuenta como acierto si falló alguna vez
    awaitingCorrect = false;

    setTimeout(() => {
      feedback.textContent = "Selecciona la emoción correcta";
      feedback.style.color = "#666";
    }, 1500);
  }
}

function goToMainMenu() {
  window.location.href = 'mainMenu.html';
}

window.onload = loadRandomEmotion;
