
document.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.target.id === 'nav') {
        console.log('nav clicked');
        let elementsToHide = document.querySelectorAll('.title');
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });
    }
    if (evt.target.id === 'gameOption' || evt.target.id === 'containerCanvas') {
        let body = document.querySelector('body');
        body.classList.add('bracket-body');
    }
    // if (evt.target.id === 'tmp') {
        // let body = document.querySelector('body');
        // body.classList.remove('bracket-body');
    // }
    if (evt.detail.target.id === 'tmp') {
        let body = document.querySelector('body');
        let gameCanvas = document.getElementById('pongCanvas');
        let button = document.getElementById('pongButton');
        if (gameCanvas) {
            ctx = gameCanvas.getContext('2d');
            console
            startPong(gameCanvas, button);
        }
        else {
        gameCanvas = document.getElementById('breakoutCanvas');
        ctx = gameCanvas.getContext('2d');
                    console.log('breakoutCanvas');
                    startBreakout();
        }
    }
});

document.addEventListener("htmx:beforeSwap", function(evt) {
    // Vérifie si le contenu qui est sur le point d'être injecté contient gameOption
    if (evt.detail.target.id === "nav") {
        // Supprime les éléments existants s'ils sont présents
game = false;
        ["gameOption", "gameChoice", "breakoutCanvas", "pongCanvas", "auth-form", "bracket"].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        });
    }
})