let ctx;

document.addEventListener('htmx:afterSwap', function(evt) {
	if (evt.detail.target.id === 'nav') {
		console.log('nav');
		let elementToHide = document.getElementById('title');
		if (elementToHide) {
			elementToHide.style.display = 'none';
    	}
	}
    if (evt.detail.target.id === 'gameOption') {
        let gameCanvas = document.getElementById('pongCanvas');
        if (gameCanvas) {
            ctx = gameCanvas.getContext('2d');
			startPong();
		}
		else {
			gameCanvas = document.getElementById('breakoutCanvas');
			ctx = gameCanvas.getContext('2d');
			startBreakout();
		}
    }
});

document.addEventListener("htmx:beforeSwap", function(event) {
    // Vérifie si le contenu qui est sur le point d'être injecté contient gameOption
    if (event.detail.target.id === "nav") {
        // Supprime les éléments existants s'ils sont présents
		game = false;
        ["gameOption", "gameChoice", "breakoutCanvas", "pongCanvas"].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        });
    }
})	