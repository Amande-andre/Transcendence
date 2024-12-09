document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('gameOption')) {
        let body = document.querySelector('body');
        body.classList.add('bracket-body');
    }
});

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
    // if (evt.detail.target.id === "gameOption") {
        // console.log('checkUsername');
        // let listPlayer = Array.from(document.querySelectorAll('.player'));
        // if a player in the list has the same name return false
        // let names = listPlayer.map(player => player.placeholder);
        // let uniqueNames = new Set(names);
        // console.log(names.length !== uniqueNames.size); 
        // if (names.length !== uniqueNames.size)
            // return false;
        // return true;
    // }
})

document.body.addEventListener('htmx:configRequest', function(event) {
    // Vérifie si la cible est bien #gameOption
    if (event.detail.elt.getAttribute('hx-target') === '#gameOption') {
        if (!checkUsername()) {
            event.preventDefault(); // Annule la requête HTMX
        }
    }
});

function checkUsername() {
    let listPlayer = Array.from(document.querySelectorAll('.player'));
    //if a player in the list has the same name return false
    let names = listPlayer.map(player => player.value);
    console.log(names);
    let uniqueNames = new Set(names);
    console.log(uniqueNames);
    console.log(names.length !== uniqueNames.size); 
    if (names.length !== uniqueNames.size)
        return false;
    return true;
}