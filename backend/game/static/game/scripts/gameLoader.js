let ctx;

document.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.detail.target.id === 'gameOption') {
        let gameCanvas = document.getElementById('pongCanvas');
        if (gameCanvas) {
            ctx = gameCanvas.getContext('2d');
			console.log('caca');
			startPong();
		}
		else {
			gameCanvas = document.getElementById('breakoutCanvas');
			ctx = gameCanvas.getContext('2d');
			console.log('caca');
			startBreakout();
		}
    }
});