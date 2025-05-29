const situations = [
  {
    text: "Alguien está hablando contigo.",
    image: "situations/someoneTalking.jpg",
    options: [
      { text: "Mirar a la persona y escuchar.", correct: true },
      { text: "Mirar hacia otro lado o hablar con otra persona.", correct: false }
    ]
  },
  {
    text: "Un amigo se ve triste.",
    image: "situations/sadFriend.jpg",
    options: [
      { text: "Preguntar “¿Estás bien?” y esperar su respuesta.", correct: true },
      { text: "No hacer nada e ignorarlo.", correct: false }
    ]
  },
  {
    text: "Quieres jugar con un grupo de niños que tienen juguetes.",
    image: "situations/joinGame.jpg",
    options: [
      { text: "Decir “¿Puedo jugar con ustedes?” con voz tranquila.", correct: true },
      { text: "Tomar un juguete sin preguntar.", correct: false }
    ]
  },
  {
    text: "Alguien te dice “hola”.",
    image: "situations/sayHi.jpg",
    options: [
      { text: "Decir “hola” y sonreír.", correct: true },
      { text: "No responder o alejarte rápido.", correct: false }
    ]
  },
  {
    text: "Estás en clase y el maestro habla.",
    image: "situations/teacherTalking.jpg",
    options: [
      { text: "Escuchar y no hablar hasta que sea tu turno.", correct: true },
      { text: "Hablar sin levantar la mano y esperar tu turno.", correct: false }
    ]
  },
  {
    text: "Llega un nuevo niño a tu clase.",
    image: "situations/newFriend.jpg",
    options: [
      { text: "Presentarte e invitarlo a jugar en el receso.", correct: true },
      { text: "Ignorarlo y alejarte.", correct: false }
    ]
  },
  {
    text: "Estás en una fila para comprar algo.",
    image: "situations/inLine.jpg",
    options: [
      { text: "Esperar tu turno en silencio.", correct: true },
      { text: "Empujar para pasar adelante.", correct: false }
    ]
  },
  {
    text: "Alguien te da un regalo.",
    image: "situations/gift.jpg",
    options: [
      { text: "Decir “gracias” y sonreír.", correct: true },
      { text: "No decir nada y alejarte.", correct: false }
    ]
  },
  {
    text: "En el comedor, alguien te ofrece comida.",
    image: "situations/foodOffer.jpg",
    options: [
      { text: "Decir “gracias” aunque no te guste.", correct: true },
      { text: "Decir “qué asco” o tirar la comida.", correct: false }
    ]
  },
  {
    text: "Estás jugando y te enojas porque perdiste.",
    image: "situations/lostGame.jpg",
    options: [
      { text: "Respirar profundo y decir “está bien, puedo intentar otra vez”.", correct: true },
      { text: "Gritar o tirar las cosas.", correct: false }
    ]
  }
];

let currentSituation = 0;
let score = 0;
let awaitingAnswer = true;
let shuffledOptions = [];
let firstTry = true; // NUEVO: para controlar si es el primer intento

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadSituation() {
  if (currentSituation >= situations.length) {
    // Redirigir a la página de resultados con parámetros
    window.location.href = `resultadosEmocion.html?score=${score}&total=${situations.length}`;
    return;
  }

  const situation = situations[currentSituation];
  document.getElementById('situation-text').textContent = situation.text;
  document.getElementById('situation-image').src = `assets/${situation.image}`;

  // Mezclar opciones
  shuffledOptions = shuffleArray([...situation.options]);

  // Mostrar opciones en botones
  document.getElementById('option1').textContent = shuffledOptions[0].text;
  document.getElementById('option2').textContent = shuffledOptions[1].text;

  const feedback = document.getElementById('feedback');
  feedback.textContent = "Selecciona la opción correcta";
  feedback.style.color = "#666";

  awaitingAnswer = true;
  firstTry = true; // Reiniciar el primer intento para cada situación
}

function checkAnswer(optionIndex) {
  if (!awaitingAnswer) return;

  const feedback = document.getElementById('feedback');
  const chosenOption = shuffledOptions[optionIndex];

  if (chosenOption.correct) {
    feedback.textContent = "¡Correcto!";
    feedback.style.color = "green";

    if (firstTry) {
      score++;  // Solo aumentar si fue correcto en el primer intento
    }

    awaitingAnswer = false;

    setTimeout(() => {
      currentSituation++;
      loadSituation();
    }, 1500);
  } else {
    feedback.textContent = "Inténtalo de nuevo.";
    feedback.style.color = "red";

    firstTry = false; // Ya no es el primer intento

    setTimeout(() => {
      feedback.textContent = "Selecciona la opción correcta";
      feedback.style.color = "#666";
    }, 1500);
  }
}

function goToMainMenu() {
  window.location.href = 'mainMenu.html';
}

window.onload = loadSituation;
