// Utilise HTMX events
document.document.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.detail.target.id === 'canvas-container') {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        
        // Exemple de dessin sur le canvas
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(10, 10, 100, 100);
        
        // Vous pouvez ajouter ici votre propre logique de dessin
    }
});
// Optionnel: nettoie les ressources quand le canvas est retiré
document.body.addEventListener('htmx:beforeSwap', function(evt) {
    const canvas = document.getElementById('GameCanvas');
    if (canvas) {
        // Nettoie les event listeners, arrête les animations, etc.
        keys = {};
        // Si vous avez un animation frame ID, annulez-le
        if (window.gameAnimationFrame) {
            cancelAnimationFrame(window.gameAnimationFrame);
        }
    }
});canvas