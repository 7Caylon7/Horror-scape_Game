const elements = {
    persona: document.querySelector(".persona"),
    lapide: document.querySelector(".lapide"),
    bird: document.querySelector(".bird"),
    gameover: document.querySelector(".hidden"),
    counterElement: document.getElementById("counter"),
    restartButton: document.getElementById("restart"),
};

const musics = {
    background: document.getElementById("backgroundMusic"),
    crash: document.getElementById("crashMusic"),
    running: document.getElementById("runningMusic"),
    jump: document.getElementById("jumpMusic"),
    gameover: document.getElementById("gameoverMusic"),
};

const musicFunctions = {
    play: (musicName, volume = 1) => {
        const music = musics[musicName];
        if (music) {
            music.play();
            music.volume = volume;
        }
    },
    pause: (musicName) => {
        const music = musics[musicName];
        if (music) music.pause();
    }
};

function updateCounter(count) {
    elements.counterElement.textContent = count;
}

function jump() {
    elements.persona.classList.add("jump");

    setTimeout(() => {
        elements.persona.classList.remove("jump");
    }, 500);
}

function stopGame(lapidePosition, birdPosition, personaPosition) {
    musicFunctions.pause('background');
    musicFunctions.pause('running');
    musicFunctions.play('gameover');
    
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
}

function startGame(){
    let count = 0;

    function incrementCounter(){
        count++;
        updateCounter(count);
    }

    document.addEventListener("keydown", jump);

    const loop = setInterval(() => {
        const lapidePosition = elements.lapide.offsetLeft;
        const birdPosition = elements.bird.offsetLeft;
        const personaPosition = +window.getComputedStyle(elements.persona).bottom.replace("px","");

        musicFunctions.play('background');
        musicFunctions.play('running');

        if(lapidePosition <= 60 && lapidePosition > 0 && personaPosition < 91) {
            stopGame(lapidePosition, birdPosition, personaPosition);
            clearInterval(loop);
        } else {
            incrementCounter();
        }

        if (personaPosition > 90) {
            musicFunctions.play('jump');
        }
    }, 1)
}

startGame();