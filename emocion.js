const emotions = [
    {
      category: "felicidad",
      images: [
        "assets/faces/felicidad1.jpeg",
        "assets/faces/felicidad2.jpeg"
      ]
    },
    {
      category: "tristeza",
      images: [
        "assets/faces/tristeza1.jpeg",
        "assets/faces/tristeza2.jpeg"
      ]
    },
    {
      category: "enojo",
      images: [
        "assets/faces/enojo1.jpeg",
        "assets/faces/enojo2.jpeg"
      ]
    },
    {
      category: "miedo",
      images: [
        "assets/faces/miedo1.jpeg",
        "assets/faces/miedo2.jpeg"
      ]
    }
  ];
  
  let currentEmotion = null;
  
  function loadRandomEmotion() {
    const emotionIndex = Math.floor(Math.random() * emotions.length);
    const emotion = emotions[emotionIndex];
  
    // Elegir imagen aleatoria de esa emoción
    const imageIndex = Math.floor(Math.random() * emotion.images.length);
    const image = emotion.images[imageIndex];
  
    currentEmotion = {
      category: emotion.category,
      image: image
    };
  
    document.getElementById("emotion-img").src = image;
  }
  
  function checkAnswer(answer) {
    const feedback = document.getElementById("feedback");
  
    if (answer === currentEmotion.category) {
      feedback.textContent = "¡Correcto!";
      feedback.style.color = "green";
  
      setTimeout(() => {
        feedback.textContent = "Selecciona la emoción correcta";
        feedback.style.color = "#666";
        loadRandomEmotion(); // Cambia la imagen solo aquí, si acierta
      }, 1500);
  
    } else {
      feedback.textContent = "Inténtalo de nuevo.";
      feedback.style.color = "red";
  
      setTimeout(() => {
        feedback.textContent = "Selecciona la emoción correcta";
        feedback.style.color = "#666";
        // No cambia la imagen si está mal
      }, 1500);
    }
  }
  
  window.onload = loadRandomEmotion;
  