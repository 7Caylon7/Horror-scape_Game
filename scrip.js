const persona = document.querySelector(".persona");
const lapide = document.querySelector(".lapide");
const bird = document.querySelector(".bird");
const gameover = document.querySelector(".hidden");
const counterElement = document.getElementById("counter");
const backgroundMusic = document.getElementById("backgroundMusic");
const crashMusic = document.getElementById("crashMusic");
const runningMusic = document.getElementById("runningMusic");
const jumpMusic = document.getElementById("jumpMusic");
const gameoverMusic = document.getElementById("gameoverMusic");

backgroundMusic.volume = 1;
backgroundMusic.play();

const jump = () => {
  persona.classList.add("jump");

  setTimeout(() => {
    persona.classList.remove("jump");
  }, 500);
};

let count = 0; // Inicializando o contador

function updateCounter() {
  counterElement.textContent = count;
}

function incrementCounter() {
  count++;
  updateCounter();
}

// Atualizando o contador inicialmente
updateCounter();

const loop = setInterval(() => {
  const lapidePosition = lapide.offsetLeft;
  const birdPosition = bird.offsetLeft;
  const personaPosition = +window
    .getComputedStyle(persona)
    .bottom.replace("px", "");

  if (lapidePosition <= 60 && lapidePosition > 0 && personaPosition < 91) {
    // crashMusic.play();

    lapide.style.animation = "none";
    lapide.style.left = `${lapidePosition}px`;

    bird.style.animation = "none";
    bird.style.left = `${birdPosition}px`;

    persona.style.animation = "none";
    persona.style.bottom = `${personaPosition}px`;

    persona.src = "./img/personagem-death.gif";
    persona.style.width = "60px";
    gameover.classList.remove("hidden");

    backgroundMusic.pause();
    runningMusic.pause();
    gameoverMusic.play();
  } else {
    runningMusic.volume = 0.1;
    runningMusic.play(); 
    incrementCounter();
  }

  if (personaPosition > 90) {
    backgroundMusic.play();
    runningMusic.pause();
    jumpMusic.volume = 0.1;
    jumpMusic.play();
  }
}, 10);

document.addEventListener("keydown", jump);
