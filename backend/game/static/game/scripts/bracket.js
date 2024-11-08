document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.player');
    
    players.forEach(player => {
        player.addEventListener('click', function() {
            // Retire la classe winner du match
            const matchContainer = this.parentElement;
            const players = matchContainer.querySelectorAll('.player');
            players.forEach(p => p.classList.remove('winner'));
            
            // Ajoute la classe winner au joueur cliqué
            this.classList.add('winner');
        });
    });
});