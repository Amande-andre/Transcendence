
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
    if (evt.detail.target.id === 'tmp') {
        let gameCanvas = document.getElementById('pongCanvas');
        let button = document.getElementById('gameButton');
        console.log('gameCanvas', gameCanvas);
        console.log('button', button);
        if (gameCanvas) {
            ctx = gameCanvas.getContext('2d');
            startPong(gameCanvas, button);
        }
        else {
            gameCanvas = document.getElementById('breakoutCanvas');
			if (!gameCanvas)
				return;
            ctx =  gameCanvas.getContext('2d');
            startBreakout(gameCanvas, button)
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