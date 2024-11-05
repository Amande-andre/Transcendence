let ctx;

document.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.target.id === 'nav') {
        console.log('nav clicked');
        let elementsToHide = document.querySelectorAll('.title');
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });
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