
document.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.target.id === 'nav') {
        console.log('nav clicked');
        let elementsToHide = document.querySelectorAll('.title');
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });
    }
    if (evt.detail.target.id === 'bracket') {
        let gameCanvas = document.getElementById('pongCanvas');
        if (gameCanvas) {
            ctx = gameCanvas.getContext('2d');
            tournament(startPong, gameCanvas)
		}
		else {
			gameCanvas = document.getElementById('breakoutCanvas');
			ctx = gameCanvas.getContext('2d');
            tournament(startBreakout, gameCanvas)
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