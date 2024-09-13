function buttonHome(){
    // button.classList.add('theme-home');
   let button = document.querySelectorAll('button');
   button.forEach(button => {
        button.classList.add('button');
    });
}

function main () {
    let pongButton = document.getElementById('PongButton');
    let breakoutButton = document.getElementById('BreakoutButton');
    let body = document.querySelector('body');
    console.error();
    canvas.classList.add('hidden');
    body.classList.remove('theme-game');
    body.classList.add('theme-home');
    buttonHome();
   pongButton.addEventListener('click', () => {
        canvas.classList.remove('hidden');
        body.classList.remove('theme-home');
        body.classList.add('theme-game');
        startPong();
    });
    breakoutButton.addEventListener('click', () => {
        canvas.classList.remove('hidden');
        body.classList.remove('theme-home');
        body.classList.add('theme-game');
        startBreakout();
    });
}

main();