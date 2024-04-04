const elements = {
    persona: document.querySelector(".persona"),
    lapide: document.querySelector(".lapide"),
    bird: document.querySelector(".bird"),
    gameover: document.querySelector(".hidden"),
    counterElement: document.getElementById("counter"),
    // restartButton: document.getElementById("restart"),
};

const musics = {
    background: {
        element: document.getElementById("backgroundMusic"),
        volume: 1,
    },
    crash: {
        element: document.getElementById("crashMusic"),
        volume: 1,
    },
    running: {
        element: document.getElementById("runningMusic"),
        volume: 0.1,
    },
    jump: {
        element: document.getElementById("jumpMusic"),
        volume: 0.1,
    },
    gameover: {
        element: document.getElementById("gameoverMusic"),
        volume: 1,
    },
};


// // Funções para controle de músicas
// function playMusic(music) {
//     music.element.currentTime = 0;
//     music.element.volume = music.volume;
//     music.element.play();
// }
  
// function pauseMusic(music) {
//     music.element.pause();
// }

function updateCounter(count) {
    elements.counterElement.textContent = count;
}

// Funções para salto
function jump() {
    elements.persona.classList.add("jump");
  
    setTimeout(() => {
      elements.persona.classList.remove("jump");
    }, 500);
  }


function startGame() {
    // backgroundMusic.play();
    

    let count = 0;

    updateCounter(count);

    const loop = setInterval(() => {
        const lapidePosition = elements.lapide.offsetLeft;
        const birdPosition = elements.bird.offsetLeft;
        const personaPosition = +window.getComputedStyle(elements.persona).bottom.replace("px", "");

        // runningMusic.volume = 0.1;
        // runningMusic.play();  

        if (lapidePosition <= 60 && lapidePosition > 0 && personaPosition < 91){

            elements.lapide.style.animation = "none";
            elements.lapide.style.left = `${lapidePosition}px`;

            elements.bird.style.animation = "none";
            elements.bird.style.left = `${birdPosition}px`;

            elements.persona.style.animation = "none";
            elements.persona.style.left = `${personaPosition}px`;

            elements.persona.src = "./img/personagem-death.gif";
            elements.persona.style.width = "60px";
            elements.gameover.classList.remove("hidden");
            elements.restartButton.classList.remove("restart");

            // runningMusic.pause();
            // backgroundMusic.pause();
            // gameoverMusic.play();

        }else{
            incrementCounter();
        }

        if(personaPosition > 90){
            // runningMusic.pause();
            // jumpMusic.volume = 0.1;
            // jumpMusic.play();
        }

    }, 10);

    document.addEventListener("keydown", jump);

    function incrementCounter() {
        count++;
        updateCounter(count);
    }
}

startGame();