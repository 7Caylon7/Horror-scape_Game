const elements = {
    persona: document.querySelector(".persona"),
    lapide: document.querySelector(".lapide"),
    bird: document.querySelector(".bird"),
    gameover: document.querySelector(".hidden"),
    counterElement: document.getElementById("counter"),
    restartButton: document.getElementById("restart"),
};

const musics = {
    background: {
        element: document.getElementById("backgroundMusic"),
    },
    crash: {
        element: document.getElementById("crashMusic"),
    },
    running: {
        element: document.getElementById("runningMusic"),
    },
    jump: {
        element: document.getElementById("jumpMusic"),
    },
    gameover: {
        element: document.getElementById("gameoverMusic"),
    },
};


function playBackgroundMusic(){
    musics.background.element.play();
}

function pauseBackgroundMusic(){
    musics.background.element.pause();
}

function playRunningMusic(){
    musics.running.element.play();
    musics.running.element.volume = 0.1;
}

function pauseRunningMusic(){
    musics.running.element.pause();
}

function playJumpMusic(){
    musics.jump.element.play();
    musics.jump.element.volume = 0.1;
}

function playCrashMusic(){
    musics.crash.element.play();
}

function playGameoverMusic(){
    musics.gameover.element.play();
}

function pauseGameoverMusic(){
    musics.gameover.element.pause();
}

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

    let count = 0;

    updateCounter(count);

    const loop = setInterval(() => {
        const lapidePosition = elements.lapide.offsetLeft;
        const birdPosition = elements.bird.offsetLeft;
        const personaPosition = +window.getComputedStyle(elements.persona).bottom.replace("px", "");
        
        playBackgroundMusic();
        playRunningMusic();

        if (lapidePosition <= 60 && lapidePosition > 0 && personaPosition < 91){

            pauseBackgroundMusic();
            pauseRunningMusic();
            // playCrashMusic();
            playGameoverMusic();

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

        }else{
            incrementCounter();
        }

        if(personaPosition > 90){
            playJumpMusic();
        }

    }, 10);

    document.addEventListener("keydown", jump);

    function incrementCounter() {
        count++;
        updateCounter(count);
    }
}

startGame();

// elements.restartButton.addEventListener("click", () => {
//     elements.gameover.classList.add("hidden");
//     elements.restartButton.classList.add("restart");
//     pauseGameoverMusic();

//     elements.lapide.style.animation = "lapide-animation 1.5s linear infinite";

//     elements.persona.src = "./img/personagem.gif";
// });