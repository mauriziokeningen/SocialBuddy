const situations = [
  {
    text: "Alguien está hablando contigo.",
    image: "someoneTalking.jpg",
    options: [
      { text: "Mirar a la persona y escuchar.", correct: true },
      { text: "Mirar hacia otro lado o hablar con otra persona.", correct: false }
    ]
  },
  {
    text: "Un amigo se ve triste.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Preguntar “¿Estás bien?” y esperar su respuesta.", correct: true },
      { text: "No hacer nada y seguir jugando solo.", correct: false }
    ]
  },
  {
    text: "Quieres jugar con un grupo de niños.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Decir “¿Puedo jugar con ustedes?” con voz tranquila.", correct: true },
      { text: "Tomar el juguete sin preguntar.", correct: false }
    ]
  },
  {
    text: "Alguien te dice “hola”.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Decir “hola” y sonreír.", correct: true },
      { text: "No responder o alejarte rápido.", correct: false }
    ]
  },
  {
    text: "Estás en clase y el maestro habla.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Escuchar y no hablar.", correct: true },
      { text: "Levantar la mano sin permiso o hablar sin esperar.", correct: false }
    ]
  },
  {
    text: "Un niño quiere jugar con tu juguete.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Preguntar “¿Quieres jugar juntos?” y compartir.", correct: true },
      { text: "Decir “No” y no dejarlo jugar.", correct: false }
    ]
  },
  {
    text: "Estás en una fila para comprar algo.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Esperar tu turno en silencio.", correct: true },
      { text: "Empujar para pasar adelante.", correct: false }
    ]
  },
  {
    text: "Alguien te da un regalo.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Decir “gracias” y sonreír.", correct: true },
      { text: "No decir nada y alejarte.", correct: false }
    ]
  },
  {
    text: "En el comedor, alguien te ofrece comida.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Decir “gracias” aunque no te guste.", correct: true },
      { text: "Decir “qué asco” o tirar la comida.", correct: false }
    ]
  },
  {
    text: "Estás jugando y te enojas porque perdiste.",
    image: "persona_hablando.jpg",
    options: [
      { text: "Respirar profundo y decir “está bien, puedo intentar otra vez”.", correct: true },
      { text: "Gritar o tirar las cosas.", correct: false }
    ]
  }
];

let currentSituation = 0;
let score = 0;
let awaitingAnswer = true;

function loadSituation() {
  const situation = situations[currentSituation];
  document.getElementById('situation-text').textContent = situation.text;

  // Cargar las opciones en botones
  document.getElementById('option1').textContent = situation.options[0].text;
  document.getElementById('option2').textContent = situation.options[1].text;

  // Reset feedback
  const feedback = document.getElementById('feedback');
  feedback.textContent = "Selecciona la opción correcta";
  feedback.style.color = "#666";

  awaitingAnswer = true;
}

function checkAnswer(optionIndex) {
  if (!awaitingAnswer) return; // prevenir respuestas múltiples rápidas

  const situation = situations[currentSituation];
  const feedback = document.getElementById('feedback');
  const chosenOption = situation.options[optionIndex];

  if (chosenOption.correct) {
    feedback.textContent = "¡Correcto!";
    feedback.style.color = "green";

    if (awaitingAnswer) {
      score++;
    }
  } else {
    feedback.textContent = "Inténtalo de nuevo.";
    feedback.style.color = "red";
  }

  awaitingAnswer = false;

  setTimeout(() => {
    currentSituation++;
    if (currentSituation >= situations.length) {
      alert(`Terminaste! Puntaje: ${score} / ${situations.length}`);
      currentSituation = 0;
      score = 0;
    }
    loadSituation();
  }, 1500);
}

function goToMainMenu() {
  window.location.href = 'mainMenu.html';
}

window.onload = loadSituation;
