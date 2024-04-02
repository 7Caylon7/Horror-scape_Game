const persona = document.querySelector('.persona');
const lapide = document.querySelector('.lapide');
const bird = document.querySelector('.bird');
const gameover = document.querySelector('.hidden');
const counterElement = document.getElementById("counter");
// const restartButton = document.querySelector('restartButton');

const jump = () => {
    persona.classList.add('jump');

    setTimeout(() => {
        persona.classList.remove('jump'); 
    }, 500);  
}



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
    const personaPosition = +window.getComputedStyle(persona).bottom.replace('px','');
    
    if(lapidePosition <= 60 && lapidePosition > 0 && personaPosition < 91){

        lapide.style.animation = 'none';
        lapide.style.left = `${lapidePosition}px`;

        bird.style.animation = 'none';
        bird.style.left = `${birdPosition}px`;

        persona.style.animation = 'none';
        persona.style.bottom = `${personaPosition}px`;

        persona.src = '../img/personagem-death.gif';
        persona.style.width ="60px";
        gameover.classList.remove('hidden');

        // restartButton.addEventListener('click', restartGame);

    }else{
        incrementCounter()
    }
}, 10);

// function restartGame() {
//     // Aqui você reinicia o jogo, por exemplo, resetando o contador e escondendo a imagem de "game over" e o botão de reinício
//     count = 0;
//     updateCounter();
//     gameover.classList.add('hidden');
//     restartButton.classList.add('hidden');
// }

document.addEventListener('keydown', jump);