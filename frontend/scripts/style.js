function buttonHome(body, canvas){
    
    canvas.classList.add('hidden');
    body.classList.remove('theme-game');
    body.classList.add('theme-home');
    console.log("test   fd");

}

function listenClick(body, canvas, Button) {
    Button.addEventListener('click', () => {
        canvas.classList.remove('hidden');
        body.classList.remove('theme-home');
        body.classList.add('theme-game');
        if (Button.id === 'BreakoutButton') {
            startBreakout();
        }
        if (Button.id === 'PongButton') {
            startPong();
        }
        console.log(Button.id);
        //startGame();
    });
}