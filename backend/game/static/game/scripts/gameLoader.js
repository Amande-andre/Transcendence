// Utilise HTMX events
document.addEventListener('htmx:afterSwap', function(evt) {
    console.log('Valeur de evt.detail.target.id:', evt.detail.target.id);
    if (evt.detail.target.id === 'nav') {
        let canvas = document.getElementById('gameCanvas');
        if (canvas) {
            let ctx = canvas.getContext('2d');
            let game = document.getElementById('breakout');
            console.log('game:', game);
            if (game)
                startBreakout(ctx);
            game = document.getElementById('pong');
            if (game)
                startPong(ctx);
        }
        else {
            console.log('No canvas found');
        }
    }
});