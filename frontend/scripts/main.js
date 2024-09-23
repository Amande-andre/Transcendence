
// function startGame() {
    
// }

// function endGame() {
    
// }

function main () {
    //logbutton tant que pas log pas de jeu
    
    let pongButton = document.getElementById('PongButton');
    let breakoutButton = document.getElementById('BreakoutButton');
    let body = document.querySelector('body');
    let home = document.getElementById('HomeButton');
    let register = document.getElementById('RegisterButton');
    //register.classList.add('hidden');
    let bouton = document.querySelectorAll('button');
    bouton.forEach(bouton => {
        bouton.classList.add('button');
    });
    console.error();
    //canvas.classList.add('hidden');
    body.classList.remove('theme-game');
    body.classList.add('theme-home');
    listenClick(body, canvas, pongButton);
    listenClick(body, canvas, breakoutButton);
    
    home.addEventListener('click', () => {

        buttonHome(body, canvas);
    });
}



main();